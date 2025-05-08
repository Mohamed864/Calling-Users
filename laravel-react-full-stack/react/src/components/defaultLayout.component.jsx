import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/context";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../APIs";

const DefaultLayout = () => {
    const { user, token, notification, setUser, setToken } = useStateContext();

    //activate te auth guard
    if (!token) {
        return <Navigate to="/login" />;
    }

    //logout function
    const onLogOut = (e) => {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => setUser(data));
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user">User</Link>
            </aside>
            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a className="btn-logout" onClick={onLogOut} href="#">
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">{notification}</div>}
        </div>
    );
};

export default DefaultLayout;
