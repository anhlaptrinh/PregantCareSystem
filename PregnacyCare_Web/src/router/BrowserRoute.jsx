import { createBrowserRouter } from "react-router-dom"
import HomePages from "../pages/HomePages"
import AdminPages from "../pages/AdminPages"
import HomeTemplate from "../modules/HomeTemplate"
import AppointmentPages from "../pages/HomePages/AppointmentPages"

const routes = [
    {
        path: "/",
        element: <HomePages />,
        children:[
           {
            path: "/",
            element: <HomeTemplate />,
           },
           {
            path: "/appointment",
            element: <AppointmentPages />,

           }

        ]

    },
    {
        path: "/admin",
        element: <AdminPages />,
    },
   
]

export const router = createBrowserRouter(routes)