<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
<<<<<<< HEAD
} from "@mui/material";
import { message as Message } from "antd";
import { Add, Edit, CalendarToday } from "@mui/icons-material";
import PregnantAvatar from "../../../../assets/PregnantAvatar.jpg";
import moment from "moment";
import AddFetusModal from "./AddFetusModal";
import EditFetusModal from "./EditFetusModal";
import { useGetFetusList } from "../../../../apis/CallAPIFetus";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase/firebaseConfig";
import BackdropLoader from "../../../../component/BackdropLoader";

export default function FamilyInfo() {
  // Lưu danh sách fetus trong state để có thể cập nhật khi cần
  const [fetusList, setFetusList] = useState([]);

  // State để quản lý modal Add và Edit
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [selectedFetus, setSelectedFetus] = useState(null);
  const [loading, setLoading] = useState(null);

  // Khi bấm nút edit, lưu fetus được chọn vào state và mở modal edit
  const handleEditClick = (fetus) => {
    if (fetus) {
      setSelectedFetus(fetus);
      setVisibleEdit(true);
    }
  };

  const fetchFetusList = async () => {
    setLoading(true);
    try {
      const res = await useGetFetusList();
      if (res.code === 200 && res.data) {
        const fetusWithImages = await Promise.all(
          res.data.map(async (fetus) => {
            try {
              const imageRef = ref(
                storage,
                `pregnancyCareImages/fetus/${fetus.idFetus}`
              );
              const url = await getDownloadURL(imageRef);
              return { ...fetus, imageUrl: url };
            } catch (error) {
              console.error(
                "Error retrieving image for fetus id",
                fetus.idFetus,
                error
              );
              // Nếu không lấy được ảnh, trả về ảnh mặc định
              return { ...fetus, imageUrl: PregnantAvatar };
            }
          })
        );
        setFetusList(fetusWithImages);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching fetus list:", err);
    }
  };

  useEffect(() => {
    fetchFetusList();
  }, []);

  return (
    <div>
      <BackdropLoader open={loading} />
=======
  
} from "@mui/material";
import { Add, Edit, CalendarToday } from "@mui/icons-material";
import PregnantAvatar from "../../../../assets/PregnantAvatar.jpg";

const pregnancies = [
  { id: 1, title: "My pregnancy", date: "October 17, 2025" },
  { id: 2, title: "My pregnancy", date: "October 17, 2025" },
];

export default function FamilyInfo() {
  return (
    <div>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
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
<<<<<<< HEAD
        {fetusList.map((fetus) => (
          <ListItem key={fetus.idFetus} sx={{ width: 500 }}>
            {/* Avatar */}
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, marginRight: 2 }}>
                <img src={fetus.imageUrl} alt="Avatar of Pregnant" />
=======
        {pregnancies.map((pregnancy) => (
          <ListItem key={pregnancy.id} sx={{ width: 500 }}>
            {/* Avatar */}
            <ListItemAvatar>
              <Avatar sx={{ width: 60, height: 60, marginRight: 2 }}>
                <img src={PregnantAvatar} alt="Avatar of Pregnant" />
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
              </Avatar>
            </ListItemAvatar>
            {/* Text */}
            <ListItemText
              primary={
                <Typography variant="h5" gutterBottom>
<<<<<<< HEAD
                  {fetus.nameFetus}
=======
                  {pregnancy.title}
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
                </Typography>
              }
              secondary={
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarToday sx={{ fontSize: 18, mr: 1 }} />
<<<<<<< HEAD
                  {moment(fetus.dateFetus).format("MMMM D, YYYY")}
                </Typography>
              }
            />
            {/* Edit Icon */}
            <IconButton
              sx={{ color: "#615EFC", width: "9%" }}
              onClick={() => handleEditClick(fetus)}
            >
=======
                  {pregnancy.date}
                </Typography>
              }
            />{" "}
            {/* Edit Icon */}
            <IconButton sx={{ color: "#615EFC", width: "9%" }}>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
              <Edit />
            </IconButton>
          </ListItem>
        ))}
      </List>

<<<<<<< HEAD
      {/* Modal Edit: render duy nhất 1 modal chỉnh sửa nếu có fetus được chọn */}
      {selectedFetus && (
        <EditFetusModal
          visible={visibleEdit}
          onClose={() => {
            setVisibleEdit(false);
            setSelectedFetus(null);
          }}
          fetus={selectedFetus}
          refreshFetusList={fetchFetusList}
        />
      )}

=======
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
      {/* Add Pregnancy Button */}
      <Button
        startIcon={<Add />}
        sx={{ color: "#615EFC", textTransform: "none", mb: 5, fontSize: 15 }}
<<<<<<< HEAD
        onClick={() => setVisibleAdd(true)}
      >
        Add a pregnancy
      </Button>
      <AddFetusModal
        visible={visibleAdd}
        onClose={() => setVisibleAdd(false)}
        refreshFetusList={fetchFetusList}
      />
=======
      >
        Add a pregnancy
      </Button>
>>>>>>> 39d6bdf31cd999789c904c5a45ae450802985703
    </div>
  );
}
