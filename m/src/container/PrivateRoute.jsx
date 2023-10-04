import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth);
  return token ? <Outlet /> : <Navigate to="/" replace />;
};
export default PrivateRoute;
