import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { login } from "../../feature/displaySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLoginData } from "../../feature/apiSlice";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cookies, setCookie] = useCookies(["userCookie"]);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

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

  const handleChange = () => {
    event.preventDefault();
    console.log(event.target.value);
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    console.log(data);
    event.preventDefault();
    // Set expiration time for the cookie (e.g., 1 hour from now)
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 1); // Add 1 hour

    // Set the cookie with expiration time
    setCookie("userCookie", data.email, { expires: expirationDate });
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
    dispatch(postLoginData(data))
      .then((response) => {
        if (response.payload === "Invalid Username or Password") {
          // Handle invalid credentials
          notifyFailure(response.payload);
        } else {
          // Handle successful login
          notifySuccess();
          setTimeout(() => {
            navigate("/");
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle network errors
        notifyFailure("Network Error: Please try again later.");
      });
  };
  return (
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
  );
}

export default Login;
