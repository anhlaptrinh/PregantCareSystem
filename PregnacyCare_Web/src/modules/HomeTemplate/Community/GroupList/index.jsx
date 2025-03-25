import {
  Box,
  Card,
  Typography,
  Pagination,
  Skeleton,
  ButtonBase,
} from "@mui/material";
import React, { useState, useMemo, useEffect } from "react";
import AvatarDefault from "../../../../assets/PregnantAvatar.jpg";
import { useGetGroupList } from "../../../../apis/CallAPIGroup";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";
import { motion } from "framer-motion";
import { useGetImageUrl } from "../../../../apis/CallAPIFirebase";
import { useQuery } from "@tanstack/react-query";

export default function GroupList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5;

  // Sử dụng React Query để fetch groups và lưu vào cache với key "GroupList"
  const {
    data: groups = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["GroupList"],
    queryFn: async () => {
      const res = await useGetGroupList();
      if (res.code === 200) {
        // Cập nhật ảnh cho từng group từ Firebase
        const groupsWithImages = await Promise.all(
          res.data.map(async (group) => {
            try {
              const url = await useGetImageUrl(
                "pregnancyCareImages/groups",
                group.id
              );
              return { ...group, imageUrl: url || AvatarDefault };
            } catch (error) {
              console.error(error);
              return { ...group, imageUrl: group.imageUrl || AvatarDefault };
            }
          })
        );
        return groupsWithImages;
      }
      throw new Error("Error fetching groups");
    },
    staleTime: 1000 * 60 * 5, // Dữ liệu fresh trong 5 phút
  });

  const navigateToGroup = (groupId) => {
    navigate(`/community/group/${groupId}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Box>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Group List
      </Typography>
      <SearchBar onSearch={handleSearch} placeholder="Search groups..." />

      {/* Hiển thị Skeleton nếu loading */}
      {isLoading &&
        Array.from(new Array(groupsPerPage)).map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            height={80}
            sx={{ my: 2, borderRadius: 2 }}
          />
        ))}

      {/* Danh sách Groups */}
      {currentGroups.map((group) => (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          key={group.id}
        >
          <ButtonBase
            onClick={() => navigateToGroup(group.id)}
            sx={{ width: "100%" }}
          >
            <Card
              sx={{
                mb: 2,
                p: 2,
                width: "100%",
                transition: "border 0.3s ease, transform 0.3s ease",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <div className="row justify-content-md-center">
                <div className="col-md-auto col-2" style={{ width: 70 }}>
                  <img
                    src={group.imageUrl || AvatarDefault}
                    alt="Avatar of group"
                    style={{ width: "100%", borderRadius: "50%" }}
                  />
                </div>
                <div className="col">
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{ color: "#201F57" }}
                  >
                    {group.name}
                  </Typography>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    {group.users.length} members •{" "}
                    {moment(group.date).format("MMMM D, YYYY")}
                  </Typography>
                </div>
              </div>
            </Card>
          </ButtonBase>
        </motion.div>
      ))}

      {/* Phân trang */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
}
