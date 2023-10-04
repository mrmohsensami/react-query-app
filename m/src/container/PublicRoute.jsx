import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { token } = useSelector((state) => state.auth);
  return !token ? <Outlet /> : <Navigate to="/panel" replace />;
};
export default PublicRoute;
