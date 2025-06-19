import { Navigate, Outlet } from "react-router-dom";
import {
    hasAccess,
    isAuthenticated,
    isTokenExpired,
    logout,
} from "../../lib/auth";

type Props = {
    feature: string;
};

export default function ProtectedRoute({ feature }: Props) {
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    if (isTokenExpired()) {
        logout();
    }
    if (!hasAccess(feature)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
