import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token } = useSelector((state: any) => state.auth);
  return !token ? <Outlet /> : <Navigate to="/profile" replace />;
};
export default PublicRoute;
