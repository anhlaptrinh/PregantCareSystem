import { createBrowserRouter } from "react-router-dom"
import HomePages from "../pages/HomePages"
import AdminPages from "../pages/AdminPages"
import HomeTemplate from "../modules/HomeTemplate"

const routes = [
    {
        path: "/",
        element: <HomePages />,
        children:[
           {
            path: "/",
            element: <HomeTemplate />,
           }

        ]

    },
    {
        path: "/admin",
        element: <AdminPages />,
    },
   
]

export const router = createBrowserRouter(routes)