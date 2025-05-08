import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import User from "./views/user";
import NotFound from "./views/notFound";
import DefaultLayout from "./components/defaultLayout.component";
import GuestLayout from "./components/guestLayout.component";
import Dashboard from "./views/dashboard";
import UserForm from "./views/userForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/user" />,
            },
            {
                path: "/user",
                element: <User />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
