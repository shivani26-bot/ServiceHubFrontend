import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./CompanySignup.css";
function CompanySignup() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="centered-container">
      <div className="form-container">
        <>
          <div className="login-title">
            <h2 className="font-weight-bold">Company Signup</h2>
          </div>

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="validationCustom01">
              {/* <Form.Label>Email</Form.Label> */}
              <Form.Control
                required
                type="text"
                className="mb-3 outline"
                placeholder="Email"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom01">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                className="mb-3 outline"
                placeholder="Password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom01">
              {/* <Form.Label>Confirm Password</Form.Label> */}
              <Form.Control
                type="password"
                className="mb-3 outline"
                placeholder="Confirm Password"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom02">
              {/* <Form.Label>Company Name</Form.Label> */}
              <Form.Control
                required
                type="text"
                className="mb-3 outline"
                placeholder="Company Name"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustom03">
              {/* <Form.Label>Address</Form.Label> */}
              <Form.Control
                type="text"
                className="mb-3 outline"
                placeholder="Address"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              className="mb-3 outline"
              controlId="validationCustom04"
            >
              {/* <Form.Label>Telephone</Form.Label> */}
              <Form.Control
                type="text"
                placeholder="Telephone Optional"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a Phone Number.
              </Form.Control.Feedback>
            </Form.Group>

            <Button className="custom-button mb-2">Register</Button>
          </Form>
          <p>
            Or{" "}
            <a
              href="/login"
              className="register-link font-weight-bold fs-6 mb-0"
            >
              login now!
            </a>
          </p>
        </>
      </div>
    </div>
  );
}

export default CompanySignup;
