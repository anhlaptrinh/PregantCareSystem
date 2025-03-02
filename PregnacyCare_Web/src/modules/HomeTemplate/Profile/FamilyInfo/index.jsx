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

const pregnancies = [
  { id: 1, title: "My pregnancy", date: "October 17, 2025" },
  { id: 2, title: "My pregnancy", date: "October 17, 2025" },
];

export default function FamilyInfo() {
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
        {pregnancies.map((pregnancy) => (
          <ListItem key={pregnancy.id} sx={{ width: 500 }}>
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
                  {pregnancy.title}
                </Typography>
              }
              secondary={
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarToday sx={{ fontSize: 18, mr: 1 }} />
                  {pregnancy.date}
                </Typography>
              }
            />{" "}
            {/* Edit Icon */}
            <IconButton sx={{ color: "#615EFC", width: "9%" }}>
              <Edit />
            </IconButton>
          </ListItem>
        ))}
      </List>

      {/* Add Pregnancy Button */}
      <Button
        startIcon={<Add />}
        sx={{ color: "#615EFC", textTransform: "none", mb: 5, fontSize: 15 }}
      >
        Add a pregnancy
      </Button>
    </div>
  );
}
