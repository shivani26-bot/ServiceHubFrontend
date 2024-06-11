import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { login } from "../../feature/displaySlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLogin } from "../../feature/authSlice";

import AdminMainNavigation from "./AdminMainNavigation";

function AdminLogin() {
  const UserRole = {
    SERVICEHUBADMIN: "SERVICEHUBADMIN",
  };

  const notifySuccess = () =>
    toast.success("Logged in Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "custom-toast-container",
    });
  const notifyFailure = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      className: "custom-toast-container",
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authToken, userId, userData } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      login({
        username: data.username,
        password: data.password,
      })
    );
    dispatch(postLogin({ username: data.username, password: data.password }))
      .then((response) => {
        if (response.payload === "Invalid Username or Password") {
          notifyFailure(response.payload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (authToken && userId && userData) {
      sessionStorage.setItem("authToken", authToken);
      sessionStorage.setItem("userId", userId);
      sessionStorage.setItem("userData", JSON.stringify(userData));

      if (userData.role === UserRole.SERVICEHUBADMIN) {
        notifySuccess();
        setTimeout(() => {
          navigate("/adminDashboard");
        }, 3000);
      }
    }
  }, [authToken, userId, userData, navigate]);

  return (
    <>
      <AdminMainNavigation />
      <div className="gradient-background">
        <div className="blur-overlay"></div>

        <div className="content-container d-flex justify-content-center align-items-center ">
          <div className="form-container">
            <div className="login-title">
              <h2 className="font-weight-bold">Login</h2>
            </div>

            <div className="mb-3 outline">
              <FloatingLabel controlId="floatingInput" label="Email address">
                <Form.Control
                  name="username"
                  value={data.username}
                  type="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>
            <div className="mb-3 outline">
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  name="password"
                  value={data.password}
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </FloatingLabel>
            </div>

            <Button className="custom-button mb-2" onClick={handleSubmit}>
              Login
            </Button>

            <p>
              Or{" "}
              <a
                href="/adminRegister"
                className="register-link font-weight-bold fs-6 mb-0"
              >
                register now!
              </a>
            </p>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              className="custom-toast-container"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
