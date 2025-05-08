import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/context";
import { Navigate } from "react-router-dom";

const GuestLayout = () => {
    const { user, token } = useStateContext();

    //activate te guest guard
    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default GuestLayout;
