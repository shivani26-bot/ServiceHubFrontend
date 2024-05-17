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
  // const [cookies, setCookie] = useCookies(["userCookie"]);
  const { loading, user, error } = useSelector((state) => state.auth);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

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
    if (user) {
      console.log(user);
      // Split the user string by '}{'
      const userParts = user.split("}{");

      // Extract the first part, which contains the user information JSON object
      const userJsonString = userParts[0] + "}";

      // Parse the user object string into JSON
      const userData = JSON.parse(userJsonString);

      const authTokenString = "{" + userParts[1];
      const authTokenData = JSON.parse(authTokenString); // Assuming token is returned in the response
      const authToken = authTokenData["Authorization Token is"];
      // console.log(authToken);
      const expirationDate = new Date();
      expirationDate.setHours(expirationDate.getHours() + 1);
      setCookie("userCookie", authToken, {
        path: "/",
        expires: expirationDate,
      });

      const userId = userData.userId;
      // console.log(userId);
      // Now you can access the role from the parsed user object
      console.log(userData.role); // This should print "CUSTOMER"
      // console.log(user.role);
      // console.log(UserRole.CUSTOMER);
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
        // Redirect to service provider dashboard if user is a service provider
      }
      // else {
      //   notifyFailure("Invalid Username or Password");
      // }
    }
  }, [user, navigate]);

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
