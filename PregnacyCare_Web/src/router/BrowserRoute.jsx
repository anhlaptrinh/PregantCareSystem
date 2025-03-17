import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../component/ProtectedRoute";
// Các trang dành cho MEMBER và EXPERT (chung)
import HomePages from "../pages/HomePages";

import HomeTemplate from "../modules/HomeTemplate";
import OurExpert from "../pages/OurExpert";
import ArticlePage from "../pages/ArticlePage";
import QAForum from "../pages/QAForum";
import ForumPostDetail from "../pages/QAForum/ForumPostDetail";

// Các trang chỉ dành cho MEMBER
import AppointmentManagement from "../pages/AppointmentManagement";
import AppointmentCalendar from "../pages/AppointmentManagement/AppointmentCalendar";
import AppointmentSchedule from "../pages/AppointmentManagement/AppointmentSchedule";
import ProfilePages from "../pages/HomePages/ProfilePages";
import FetusGrowthChart from "../pages/HomePages/FetusGrowthChart";
import CommunityPages from "../pages/HomePages/CommunityPages";
import ViewPostPages from "../pages/HomePages/CommunityPages/VIewPostPages";
import ViewGroupPages from "../pages/HomePages/CommunityPages/VIewGroupPages";
import CreatePostPages from "../pages/HomePages/CommunityPages/CreatePostPages";
import Ovulation from "../pages/Ovulation";
import DueDateCalculatorTemplate from "../modules/DueDateTemplate";
import DueDateCalculatorResultTemplate from "../modules/DueDateResultTemplate";
import PaymentPage from "../pages/PaymentPage";

// Các trang dành cho ADMIN
import Dashboard from "../pages/AdminPages/Dashboard";
import BlogManagement from "../pages/AdminPages/Blog";
import MainLayout from "../component/AdminLayout";
import ForumAdmin from "../pages/AdminPages/ForumAdmin";
import UserManagement from "../pages/AdminPages/User";
import ErrorPage from "../pages/ErrorPages";

const routes = [
  // Các route không yêu cầu quyền truy cập
  {
    element: <HomePages />,
    children: [
      { path: "/", element: <HomeTemplate /> },
      { path: "/ovulation", element: <Ovulation /> },
      { path: "/due-date", element: <DueDateCalculatorTemplate /> },
      {
        path: "/due-date/result",
        element: <DueDateCalculatorResultTemplate />,
      },
    ],
  },

  // Các route chung cho MEMBER và EXPERT (ví dụ: trang chủ và các trang thông tin chung)
  {
    element: <ProtectedRoute allowedRoles={["MEMBER", "EXPERT"]} />,
    children: [
      {
        path: "/",
        element: <HomePages />,
        children: [
          { path: "/our-expert", element: <OurExpert /> },
          { path: "/article", element: <ArticlePage /> },
          { path: "/forum", element: <QAForum /> },
          { path: "/forum/:id", element: <ForumPostDetail /> },
        ],
      },
    ],
  },

  // Các route chỉ dành cho MEMBER
  {
    element: <ProtectedRoute allowedRoles={["MEMBER"]} />,
    children: [
      {
        path: "/",
        element: <HomePages />,
        children: [
          { path: "/profile", element: <ProfilePages /> },
          { path: "/community", element: <CommunityPages /> },
          {
            path: "/community/post-detail/:postId",
            element: <ViewPostPages />,
          },
          { path: "/community/group/:groupId", element: <ViewGroupPages /> },
          {
            path: "/community/group/create-post/:groupId",
            element: <CreatePostPages />,
          },
          { path: "/payment", element: <PaymentPage /> },
        ],
      },
    ],
  },

  // Các route dành cho ADMIN
  {
    element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
    children: [
      {
        path: "/admin",
        element: (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        ),
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
    ],
  },
  {
    path: "/appointment/schedule",
    element: (
      <AppointmentManagement>
        <AppointmentSchedule />
      </AppointmentManagement>
    ),
  },
  {
    path: "/appointment/calendar",
    element: (
      <AppointmentManagement>
        <AppointmentCalendar />
      </AppointmentManagement>
    ),
  },
  {
    path: "/appointment/fetus-growth-chart",
    element: (
      <AppointmentManagement>
        <FetusGrowthChart />
      </AppointmentManagement>
    ),
  },
  // Route bắt lỗi cho các URL không khớp
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
