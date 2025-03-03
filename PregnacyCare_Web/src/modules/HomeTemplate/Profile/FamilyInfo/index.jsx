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
} from "@mui/material";
import { Add, Edit, CalendarToday } from "@mui/icons-material";
import PregnantAvatar from "../../../../assets/PregnantAvatar.jpg";
import { useState } from "react";
import AddFetusModal from "./AddFetusModal";
import EditFetusModal from "./EditFetusModal";

export default function FamilyInfo() {
  // Lưu danh sách pregnancies trong state để có thể cập nhật khi cần
  const [pregnancies, setPregnancies] = useState([
    {
      id: 1,
      name: "My pregnancy",
      conceptionDate: "October 17, 2025",
      gender: "girl",
      status: false,
    },
    {
      id: 2,
      name: "My pregnancy 2",
      conceptionDate: "October 17, 2025",
      gender: "boy",
      status: false,
    },
  ]);

  // State để quản lý modal Add và Edit
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedFetus, setSelectedFetus] = useState(null);

  // Khi bấm nút edit, lưu fetus được chọn vào state và mở modal edit
  const handleEditClick = (fetus) => {
    setSelectedFetus(fetus);
    setVisibleEdit(true);
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        My Family
      </Typography>
      <Typography variant="h5" color="textSecondary" sx={{ mb: 3 }}>
        Describe where you are in your pregnancy and parenting journey by
        filling out the fields below.
      </Typography>

      {/* I'm pregnant */}
      <Typography variant="h5" fontWeight="bold">
        I&apos;m pregnant
      </Typography>
      <Divider />

      <List>
        {pregnancies.map((fetus) => (
          <ListItem key={fetus.id} sx={{ width: 500 }}>
            {/* Avatar */}
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, marginRight: 2 }}>
                <img src={PregnantAvatar} alt="Avatar of Pregnant" />
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
                  {fetus.conceptionDate}
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

      {/* Modal Edit: render duy nhất 1 modal chỉnh sửa nếu có fetus được chọn */}
      {selectedFetus && (
        <EditFetusModal
          visible={visibleEdit}
          onClose={() => {
            setVisibleEdit(false);
            setSelectedFetus(null);
          }}
          fetus={selectedFetus}
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
      />
    </div>
  );
}
