import React, { useState, useMemo, useEffect } from "react";
import { Box, Card, Typography, Pagination, IconButton } from "@mui/material";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import {
  useGetMyGroupList,
  useDeleteGroup,
} from "../../../../apis/CallAPIGroup";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";
import AddGroupDialog from "./AddGroupDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { message as Message } from "antd";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useGetImageUrl } from "../../../../apis/CallAPIFirebase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function MyGroups() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // State cho tìm kiếm, phân trang và modal delete
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [groupIdToDelete, setGroupIdToDelete] = useState(null);

  // Sử dụng useQuery để fetch groups và lưu vào cache
  const {
    data: groups = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myGroups"],
    queryFn: async () => {
      const res = await useGetMyGroupList();
      if (res.code === 200) {
        // Cập nhật ảnh cho từng group
        const groupsWithImages = await Promise.all(
          res.data.map(async (group) => {
            try {
              const url = await useGetImageUrl(
                "pregnancyCareImages/groups",
                group.id
              );
              return { ...group, imageUrl: url };
            } catch (err) {
              console.log(err);
              return { ...group, imageUrl: group.imageUrl || avatar };
            }
          })
        );
        return groupsWithImages;
      }
      throw new Error("Error fetching groups");
    },
    staleTime: 1000 * 5, // Dữ liệu fresh trong 5 phút
  });

  // Tạo danh mục từ groups
  const categories = useMemo(() => {
    const categoryMap = {};
    groups.forEach((group) => {
      if (group.blogCategory && group.blogCategory.name) {
        const catName = group.blogCategory.name;
        categoryMap[catName] = (categoryMap[catName] || 0) + 1;
      }
    });
    const categoriesArr = [{ name: "All groups", count: groups.length }];
    for (const key in categoryMap) {
      categoriesArr.push({ name: key, count: categoryMap[key] });
    }
    return categoriesArr;
  }, [groups]);

  // Lọc groups theo từ khóa tìm kiếm
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return groups;
    const lowerCasedSearchTerm = searchTerm.toLowerCase();
    return groups.filter((group) =>
      group.name.toLowerCase().includes(lowerCasedSearchTerm)
    );
  }, [groups, searchTerm]);

  // Phân trang
  const indexOfLastGroup = currentPage * groupsPerPage;
  const indexOfFirstGroup = indexOfLastGroup - groupsPerPage;
  const currentGroups = filteredGroups.slice(
    indexOfFirstGroup,
    indexOfLastGroup
  );
  const totalPages = Math.ceil(filteredGroups.length / groupsPerPage);

  const handleCardClick = (groupId) => {
    navigate(`/community/group/${groupId}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Callback khi thêm group mới từ AddGroupDialog
  const handleGroupAdded = (newGroup) => {
    // Cập nhật cache sau khi thêm group mới
    queryClient.setQueryData(["myGroups"], (oldGroups = []) => [
      newGroup,
      ...oldGroups,
    ]);
    setCurrentPage(1);
  };

  // Mở modal xác nhận xóa
  const handleOpenDeleteDialog = (groupId) => {
    setGroupIdToDelete(groupId);
    setOpenDeleteDialog(true);
  };

  // Hàm xác nhận xóa group và cập nhật cache
  const handleConfirmDelete = async () => {
    if (!groupIdToDelete) return;
    try {
      const res = await useDeleteGroup(groupIdToDelete);
      if (res.code === 200) {
        Message.success("Group deleted successfully!");
        // Cập nhật cache bằng cách loại bỏ group đã xóa
        queryClient.setQueryData(["myGroups"], (oldGroups = []) =>
          oldGroups.filter((group) => group.id !== groupIdToDelete)
        );
      } else {
        Message.error("Failed to delete group");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      Message.error("Error deleting group");
    } finally {
      setOpenDeleteDialog(false);
      setGroupIdToDelete(null);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <BackdropLoader open={isLoading} />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ p: 3, backgroundColor: "#FFFFFF" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#201F57" }}>
          My Groups
        </Typography>
        <AddGroupDialog onGroupAdded={handleGroupAdded} />
      </Box>
      <SearchBar onSearch={handleSearch} placeholder="Search groups..." />
      {currentGroups.map((group) => (
        <Card
          key={group.id}
          sx={{
            mb: 2,
            p: 2,
            cursor: "pointer",
            transition: "border 0.3s ease, transform 0.3s ease",
            border: "1px solid transparent",
            backgroundColor: "#FFFFFF",
            position: "relative",
            "&:hover": {
              border: "1px solid #615EFC",
              transform: "scale(1.02)",
            },
            "&:active": {
              opacity: "0.8",
            },
          }}
          onClick={() => handleCardClick(group.id)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 70 }}>
              <img
                src={group.imageUrl || avatar}
                alt="Avatar of group"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </Box>
            <Box>
              <Typography variant="h5" gutterBottom sx={{ color: "#201F57" }}>
                {group.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {group.users.length} members .{" "}
                {moment(group.date).format("MMMM D, YYYY")}
              </Typography>
            </Box>
          </Box>
          {/* Nút Delete nằm ở góc phải trên của Card */}
          <Box sx={{ position: "absolute", top: 8, right: 8 }}>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenDeleteDialog(group.id);
              }}
              sx={{ color: "#201F57" }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </Card>
      ))}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#201F57",
              },
              "& .Mui-selected": {
                backgroundColor: "#615EFC",
                color: "#FFFFFF",
              },
            }}
          />
        </Box>
      )}
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Group"
        content="Are you sure you want to delete this group?"
      />
    </Box>
  );
}
