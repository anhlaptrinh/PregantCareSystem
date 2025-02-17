import { createBrowserRouter } from "react-router-dom";
import HomePages from "../pages/HomePages";
import AdminPages from "../pages/AdminPages";
import HomeTemplate from "../modules/HomeTemplate";
import DueDateCalculatorPages from "../pages/DueDateCalculatorPages";
import DueDateCalculatorTemplate from "../modules/DueDateTemplate";
import DueDateCalculatorResultTemplate from "../modules/DueDateResultTemplate";
import DueDateCalculatorResultPages from "../pages/DueDateCalculatorResultPages";

const routes = [
  {
    path: "/",
    element: <HomePages />,
    children: [
      {
        path: "/",
        element: <HomeTemplate />,
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
