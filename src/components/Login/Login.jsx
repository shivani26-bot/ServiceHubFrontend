import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import { login } from "../../feature/displaySlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postLoginData } from "../../feature/apiSlice";
function Login() {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
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
    dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );
    dispatch(postLoginData(data));
  };
  return (
    <div
      style={{ marginTop: "150px" }}
      className=" d-flex justify-content-center align-items-center "
    >
      <div className="form-container">
        <>
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
        </>
      </div>
    </div>
  );
}

export default Login;
