import { useEffect } from "react";
import { logout } from "../../feature/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userData");
    dispatch(logout());

    navigate("/adminLogin");
  }, [navigate]);

  return null; // No UI needed for logout component
};

export default AdminLogout;
