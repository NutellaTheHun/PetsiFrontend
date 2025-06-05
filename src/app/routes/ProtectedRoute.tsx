import { Navigate, Outlet } from "react-router-dom";
import { hasAccess, isAuthenticated } from "../../util/auth";

type Props = {
  feature: string;
};

export default function ProtectedRoute({ feature }: Props) {
  if (!isAuthenticated()) {
    {
      console.log("NOt AUTHENTICATED");
    }
    return <Navigate to="/login" replace />;
  }
  if (!hasAccess(feature)) {
    {
      console.log("NO ACCESS");
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
