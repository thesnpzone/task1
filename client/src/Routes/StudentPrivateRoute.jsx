import { Navigate, Outlet } from "react-router-dom";
import useStudentSession from "../hooks/useStudentSession";

const StudentPrivateRoute = () => {
  const { isLoggedIn, loading } = useStudentSession();

  if (loading) return null;
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default StudentPrivateRoute;
