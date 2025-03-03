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
import OurExpert from "../pages/OurExpert";
import ArticlePage from "../pages/ArticlePage";
import QAForum from "../pages/QAForum";
import ForumPostDetail from "../pages/QAForum/ForumPostDetail";
import Dashboard from "../pages/AdminPages/Dashboard";
import BlogManagement from "../pages/AdminPages/Blog";
import MainLayout from "../component/AdminLayout";
import Ovulation from "../pages/Ovulation";
import ForumAdmin from "../pages/AdminPages/ForumAdmin";
import UserManagement from "../pages/AdminPages/User";

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
      {
        path: "/our-expert",
        element: <OurExpert />,
    },
    {
        path: "/article",
        element: <ArticlePage />,
    },
    {
        path: "/forum",
        element: <QAForum />,
    },
    {
        path: "/forum/:id",
        element: <ForumPostDetail />,
    },
    {
        path: "/ovulation",
        element: <Ovulation />,
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
  {
    path: "/admin/dashboard",
    element: (
        <MainLayout>
            <Dashboard />
        </MainLayout>
    ),
},
{
    path: "/admin/blog",
    element: (
        <MainLayout>
            <BlogManagement />
        </MainLayout>
    ),
},
{
    path: "/admin/forum",
    element: (
        <MainLayout>
            <ForumAdmin />
        </MainLayout>
    ),
},
{
    path: "/admin/user",
    element: (
        <MainLayout>
            <UserManagement />
        </MainLayout>
    ),
},
];

export const router = createBrowserRouter(routes);
