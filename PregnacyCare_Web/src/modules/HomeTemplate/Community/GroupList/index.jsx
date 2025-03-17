import { Box, Card, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "../../../../assets/PregnantAvatar.jpg";
import { useGetGroupList } from "../../../../apis/CallAPIGroup";
import moment from "moment";
import BackdropLoader from "../../../../component/BackdropLoader";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../../component/SearchBar";

export default function GroupList() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const groupsPerPage = 5; // Số group hiển thị trên mỗi trang

  // Lấy danh sách tất cả các group từ API
  const handleGetAllGroups = async () => {
    setLoading(true);
    const res = await useGetGroupList();
    if (res.code === 200) {
      setGroups(res.data);
      setFilteredGroups(res.data); // Ban đầu, filteredGroups = groups
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetAllGroups();
  }, []);

  // Xử lý chuyển trang khi nhấn vào card
  const handleCardClick = (groupId) => {
    navigate(`/community/group/${groupId}`);
  };

  // Hàm xử lý tìm kiếm từ khóa
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredGroups(groups);
    } else {
      const lowerCasedSearchTerm = searchTerm.toLowerCase();
      const filtered = groups.filter((group) =>
        group.name.toLowerCase().includes(lowerCasedSearchTerm)
      );
      setFilteredGroups(filtered);
    }
    setCurrentPage(1); // Reset trang về 1 khi tìm kiếm
  };

  // Logic phân trang
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

  return (
    <Box>
      <BackdropLoader open={loading} />
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Group List
      </Typography>

      {/* Component SearchBar */}
      <SearchBar onSearch={handleSearch} placeholder="Search groups..." />

      {/* Danh sách Group */}
      {currentGroups.map((group) => (
        <Card
          key={group.id}
          sx={{
            mb: 2,
            p: 2,
            cursor: "pointer",
            transition: "border 0.3s ease",
            border: "1px solid transparent",
            "&:hover": {
              border: "1px solid #615EFC", // Màu border khi hover
            },
            "&:active": {
              opacity: "0.5",
            },
          }}
          onClick={() => handleCardClick(group.id)}
        >
          <div className="row justify-content-md-center">
            <div className="col-md-auto col-2" style={{ width: 70 }}>
              <img
                src={Avatar}
                alt="Avatar of group"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col">
              <Typography variant="h5" gutterBottom>
                {group.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {group.users.length} members .{" "}
                {moment(group.date).format("MMMM D, YYYY")}
              </Typography>
            </div>
          </div>
        </Card>
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
