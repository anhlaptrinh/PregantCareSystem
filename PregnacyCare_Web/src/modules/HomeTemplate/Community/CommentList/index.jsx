import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import avatar from "../../../../assets/PregnantAvatar.jpg";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import CommentActionMenu from "./CommentActionMenu";
import { useDeleteComment } from "../../../../apis/CallAPIComment";

export default function CommentList({ data, currentUser }) {
  const [comments, setComments] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  // Mở menu
  const handleMenuOpen = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  // Call API để edit comment
  const handleSaveEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  // Khi nhấn "Edit" từ menu, hàm này sẽ chuyển comment sang chế độ chỉnh sửa
  const handleEditMenuClick = () => {
    if (selectedComment) {
      setEditingCommentId(selectedComment.id);
      setEditedCommentText(selectedComment.description);
    }
    handleMenuClose();
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  // Call API để xóa comment
  const handleConfirmDelete = async () => {
    const res = await useDeleteComment();
    if (res.code === 200) {
      setComments(comments.filter((c) => c.id !== selectedComment.id));
    }
    setOpenDeleteConfirm(false);
  };

  const handleDeleteMenuClick = () => {
    setOpenDeleteConfirm(true);
    handleMenuClose();
  };

  const handleCancelDelete = () => {
    setOpenDeleteConfirm(false);
  };

  // Cập nhật comments khi data thay đổi
  useEffect(() => {
    if (data?.blogComments) {
      setComments(data.blogComments);
    }
  }, [data.blogComments]);

  return (
    <Box>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Card key={comment?.id} sx={{ mb: 2, p: 2, position: "relative" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img
                  src={avatar}
                  alt="Avatar of member"
                  style={{ width: 50, borderRadius: "50%" }}
                />
                <Box>
                  <Typography variant="h5" fontWeight="bold">
                    {comment?.user?.fullName || "Unknown User"}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {moment(comment?.datePublish).format("MMMM D, YYYY")}
                  </Typography>
                </Box>
              </Box>
              {/* Hiển thị nút MoreHoriz chỉ nếu comment thuộc về user hiện tại */}
              {comment?.user?.email === currentUser.email && (
                <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                  <MoreHorizIcon />
                </IconButton>
              )}
            </Box>
            {editingCommentId === comment.id ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  value={editedCommentText}
                  onChange={(e) => setEditedCommentText(e.target.value)}
                  sx={{ mt: 2 }}
                />
                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveEdit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="h5" sx={{ mt: 2 }}>
                {comment?.description || "No content"}
              </Typography>
            )}
            <Divider sx={{ my: 2, borderBottomWidth: 1, bgcolor: "black" }} />
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          No comments available
        </Typography>
      )}

      <CommentActionMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        handleClose={handleMenuClose}
        handleEdit={handleEditMenuClick}
        handleDelete={handleDeleteMenuClick}
      />

      <DeleteConfirmationDialog
        open={openDeleteConfirm}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
