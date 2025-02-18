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
