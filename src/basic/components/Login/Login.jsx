import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
function Login() {
  return (
    <div className="centered-container">
      <div className="form-container">
        <>
          <div className="login-title">
            <h2 className="font-weight-bold">Login</h2>
          </div>

          <div className="mb-3 outline">
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </div>
          <div className="mb-3 outline">
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </div>
          <Form.Check
            type={"checkbox"}
            id={`default-${"checkbox"}`}
            label={`Remember me`}
            className="mb-3"
          />
          <Button className="custom-button mb-2">Login</Button>

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
