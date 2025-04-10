import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../component/ProtectedRoute";
// Các trang dành cho MEMBER và EXPERT (chung)
import HomePages from "../pages/HomePages";

import HomeTemplate from "../modules/HomeTemplate";
import OurExpert from "../pages/OurExpert";
import ArticlePage from "../pages/ArticlePage";
import ForumPostDetail from "../pages/QAForum/ForumPostDetail";

// Các trang chỉ dành cho MEMBER
import AppointmentManagement from "../pages/AppointmentManagement";
import AppointmentCalendar from "../pages/AppointmentManagement/AppointmentCalendar";
import AppointmentSchedule from "../pages/AppointmentManagement/AppointmentSchedule";
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
import AccountInfo from "../modules/HomeTemplate/Profile/AccountInfo";
import ProfilePages from "../pages/HomePages/ProfilePages";
import Home from "../modules/HomeTemplate/Community/Home";
import LoginSignin from "../modules/HomeTemplate/LoginSignin";
import ExpertDetail from "../pages/ArticlePage/ExpertDetail";
import ArticleForm from "../modules/HomeTemplate/Profile/ArticleForm";
import Verification from "../modules/HomeTemplate/Verification";
import PaymentSuccess from "../pages/PaymentPage/PaymentSuccess";
import PaymentFailure from "../pages/PaymentPage/PaymentFailure";
import PackageManagement from "../pages/AdminPages/PackageManagement";
import FetalGrowthPages from "../pages/FetalGrowthPages";

const routes = [
  // Các route không yêu cầu quyền truy cập
  { path: "/login", element: <LoginSignin /> },
  {
    element: <HomePages />,
    children: [
      { path: "/", element: <HomeTemplate /> },
      { path: "/ovulation", element: <Ovulation /> },
      { path: "/fetal-growth", element: <FetalGrowthPages /> },
      { path: "/due-date", element: <DueDateCalculatorTemplate /> },
      {
        path: "/due-date/result",
        element: <DueDateCalculatorResultTemplate />,
      },
      { path: "/community/home", element: <Home /> },
      {
        path: "/community/post-detail/:postId",
        element: <ViewPostPages />,
      },
      { path: "/our-expert", element: <OurExpert /> },
      { path: "/our-expert/expert-detail/:id", element: <ExpertDetail /> },
      {
        path: "/our-expert/article/:slug",
        element: <ArticlePage />,
      },
    ],
  },
  { path: "/login", element: <LoginSignin /> },
  { path: "/verification", element: <Verification /> },

  // Các route dành cho EXPERT
  {
    element: <ProtectedRoute allowedRoles={["EXPERT"]} />,
    children: [
      {
        path: "/",
        element: <HomePages />,
        children: [
          {
            path: "/expert/forum",
            element: <ForumAdmin />,
          },
          {
            path: "/expert/forum/:id",
            element: <ForumPostDetail />,
          },
          {
            path: "/profile/article-form",
            element: <ArticleForm />,
          },
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
          { path: "/community/group/:groupId", element: <ViewGroupPages /> },
          {
            path: "/community/group/create-post/:groupId",
            element: <CreatePostPages />,
          },
          { path: "/payment/:id", element: <PaymentPage /> },
          { path: "/payment/success/:paymentId", element: <PaymentSuccess /> },
          { path: "/payment/failure", element: <PaymentFailure /> },
          {
            path: "/appointment/fetus-growth-chart",
            element: <FetusGrowthChart />,
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
    ],
  },

  {
    element: <ProtectedRoute allowedRoles={["MEMBER", "EXPERT", "ADMIN"]} />,
    children: [
      {
        path: "/",
        element: <HomePages />,
        children: [
          {
            path: "/account-info",
            element: <AccountInfo />,
          },
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
        path: "/admin/user",
        element: (
          <MainLayout>
            <UserManagement />
          </MainLayout>
        ),
      },
      {
        path: "/admin/package",
        element: (
          <MainLayout>
            <PackageManagement />
          </MainLayout>
        ),
      },
    ],
  },

  // Route bắt lỗi cho các URL không khớp
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export const router = createBrowserRouter(routes);
