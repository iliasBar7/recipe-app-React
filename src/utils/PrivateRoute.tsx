import { Navigate } from "react-router-dom";
import type {JSX} from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" replace />;
}
