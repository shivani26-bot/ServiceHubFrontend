import { useEffect } from "react";
import { logout } from "../../feature/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userData");
    dispatch(logout());
    // Redirect to login page
    navigate("/login");
  }, [navigate]);

  return null; // No UI needed for logout component
};

export default Logout;
