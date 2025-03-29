import React, { useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { Add, Edit, CalendarToday } from "@mui/icons-material";
import moment from "moment";
import BackdropLoader from "../../../../component/BackdropLoader";
import AddFetusModal from "./AddFetusModal";
import EditFetusModal from "./EditFetusModal";
import { useFetchFetusList } from "../../../../hooks/FetusHooks/useFetchFetusList";

export default function FamilyInfo() {
  // Sử dụng hook đã tạo
  const { data: fetusList = [], isLoading, refetch } = useFetchFetusList();

  // State để quản lý modal Add và Edit
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedFetus, setSelectedFetus] = useState(null);

  // Khi bấm nút edit, lưu fetus được chọn vào state và mở modal edit
  const handleEditClick = (fetus) => {
    if (fetus) {
      setSelectedFetus(fetus);
      setVisibleEdit(true);
    }
  };

  return (
    <Box>
      <BackdropLoader open={isLoading} />
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        My Family
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Describe where you are in your pregnancy and parenting journey by
        filling out the fields below.
      </Typography>

      {/* I'm pregnant */}
      <Typography variant="h5" fontWeight="bold" sx={{ mt: 4 }}>
        I&apos;m pregnant
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <List>
        {fetusList.map((fetus) => (
          <ListItem key={fetus.idFetus} sx={{ width: "100%" }}>
            {/* Avatar */}
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, mr: 2 }}>
                <img src={fetus.imageUrl} alt="Avatar of Pregnant" />
              </Avatar>
            </ListItemAvatar>
            {/* Text */}
            <ListItemText
              primary={
                <Typography variant="h5" gutterBottom>
                  {fetus.name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarToday sx={{ fontSize: 18, mr: 1 }} />
                  {moment(fetus.dueDate).format("MMMM D, YYYY")}
                </Typography>
              }
            />
            {/* Edit Icon */}
            <IconButton
              sx={{ color: "#615EFC", width: "9%" }}
              onClick={() => handleEditClick(fetus)}
            >
              <Edit />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Modal Edit */}
      {selectedFetus && (
        <EditFetusModal
          visible={visibleEdit}
          onClose={() => {
            setVisibleEdit(false);
            setSelectedFetus(null);
          }}
          fetus={selectedFetus}
          refreshFetusList={refetch}
        />
      )}

      {/* Add Pregnancy Button */}
      <Button
        startIcon={<Add />}
        sx={{ color: "#615EFC", textTransform: "none", mb: 5, fontSize: 15 }}
        onClick={() => setVisibleAdd(true)}
      >
        Add a pregnancy
      </Button>
      <AddFetusModal
        visible={visibleAdd}
        onClose={() => setVisibleAdd(false)}
        refreshFetusList={refetch}
      />

      {/* Thông tin bổ sung */}
      <Box sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h4" gutterBottom>
          Additional Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          Here is some extra content to make the page longer. You can add more
          details about your pregnancy journey, health tips, or any other useful
          information.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
          lacus enim. Phasellus at lacus vitae velit fermentum ullamcorper.
          Fusce malesuada, massa eu egestas fermentum, velit arcu laoreet nulla,
          eget commodo justo purus ac eros. Vivamus posuere, sapien at facilisis
          ultrices, magna dolor porta nibh, ut fringilla nulla elit ac libero.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Integer vel mauris nec ligula tristique vestibulum. Nulla facilisi.
          Duis bibendum, erat vitae dictum tincidunt, lectus mauris tincidunt
          nibh, in cursus elit magna id nisl. Praesent sed turpis non odio
          feugiat faucibus a eget nibh. Aenean at dignissim orci.
        </Typography>
      </Box>
    </Box>
  );
}
