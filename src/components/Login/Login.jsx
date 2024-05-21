import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { login } from "../../feature/displaySlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { postLoginData } from "../../feature/apiSlice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postLogin } from "../../feature/authSlice";
import { useEffect } from "react";
import Navigation from "../Navigation/Navigation";
import { useStore } from "react-redux";
function Login() {
  const [cookies, setCookie] = useCookies(["userCookie"]);

  const UserRole = {
    CUSTOMER: "CUSTOMER",
    SERVICEPROVIDER: "SERVICEPROVIDER",
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
    });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authToken, userId, userData } = useSelector((state) => state.auth);
  // const { email, password } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  // console.log("authToken1", authToken);
  // console.log("user1", userId);
  // console.log("data", userData);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postLogin({ username: data.email, password: data.password }))
      .then((response) => {
        if (response.payload === "Invalid Username or Password") {
          notifyFailure(response.payload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error notification if needed
      });
  };

  useEffect(() => {
    // console.log("authToken1", authToken);
    // console.log("user1", userId);
    // console.log("data", userData); //{role: 'SERVICEPROVIDER', userId: 3}
    if (authToken && userId && userData) {
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      setCookie("userCookie", authToken, {
        path: "/",
        expires: expirationDate,
      });

      if (userData.role === UserRole.CUSTOMER) {
        notifySuccess();
        setTimeout(() => {
          navigate("/clientDashboard");
        }, 3000);
      } else if (userData.role === UserRole.SERVICEPROVIDER) {
        notifySuccess();
        setTimeout(() => {
          navigate("/companyDashboard");
        }, 3000);
      }
    }
  }, [authToken, userId, userData, navigate]);
  // console.log("authToken1", authToken);
  // console.log("user1", userId);
  // console.log("data", userData);
  const store = useStore();
  console.log("State:", store.getState());
  return (
    <>
      <Navigation />
      <div
        style={{ marginTop: "150px" }}
        className=" d-flex justify-content-center align-items-center "
      >
        <div className="form-container">
          <div className="login-title">
            <h2 className="font-weight-bold">Login</h2>
          </div>

          <div className="mb-3 outline">
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                name="email"
                value={data.email}
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
          <Form.Check
            type={"checkbox"}
            id={`default-${"checkbox"}`}
            label={`Remember me`}
            className="mb-3"
          />
          <Button className="custom-button mb-2" onClick={handleSubmit}>
            Login
          </Button>

          <p>
            Or{" "}
            <a
              href="/register"
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
          />
        </div>
      </div>
    </>
  );
}

export default Login;
