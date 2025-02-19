import { createBrowserRouter } from "react-router-dom";
import HomePages from "../pages/HomePages";
import AdminPages from "../pages/AdminPages";
import HomeTemplate from "../modules/HomeTemplate";
import AppointmentPages from "../pages/HomePages/AppointmentPages";
import DueDateCalculatorPages from "../pages/DueDateCalculatorPages";
import DueDateCalculatorTemplate from "../modules/DueDateTemplate";
import DueDateCalculatorResultPages from "../pages/HomePages/DueDateCalculatorResultPages";
import DueDateCalculatorResultTemplate from "../modules/DueDateResultTemplate";
import ProfilePages from "../pages/HomePages/ProfilePages";
import FetusGrowthChart from "../pages/HomePages/FetusGrowthChart";
import CommunityPages from "../pages/HomePages/CommunityPages";
import ViewPostPages from "../pages/HomePages/CommunityPages/VIewPostPages";
import ViewGroupPages from "../pages/HomePages/CommunityPages/VIewGroupPages";
import CreatePostPages from "../pages/HomePages/CommunityPages/CreatePostPages";

const routes = [
  {
    path: "/",
    element: <HomePages />,
    children: [
      {
        path: "/",
        element: <HomeTemplate />,
      },
      {
        path: "/appointment",
        element: <AppointmentPages />,
      },
      {
        path: "/profile",
        element: <ProfilePages />,
      },
      {
        path: "/fetus-growth-chart",
        element: <FetusGrowthChart />,
      },
      {
        path: "/community",
        element: <CommunityPages />,
      },
      {
        path: "/view-post",
        element: <ViewPostPages />,
      },
      {
        path: "/view-group",
        element: <ViewGroupPages />,
      },
      {
        path: "/create-post",
        element: <CreatePostPages />,
      },
    ],
  },
  {
    path: "/dueDate",
    element: <DueDateCalculatorPages />,
    children: [
      {
        path: "/dueDate",
        element: <DueDateCalculatorTemplate />,
      },
    ],
  },
  {
    path: "/dueDateResult",
    element: <DueDateCalculatorResultPages />,
    children: [
      {
        path: "/dueDateResult",
        element: <DueDateCalculatorResultTemplate />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminPages />,
  },
];

export const router = createBrowserRouter(routes);
