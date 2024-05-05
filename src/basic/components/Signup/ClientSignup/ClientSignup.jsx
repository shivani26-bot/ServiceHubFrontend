import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./ClientSignup.css";
function ClientSignup() {
  // const [validated, setValidated] = useState(false);
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(false);

  const [telephone, setTelephone] = useState("");
  const [isValidTelephone, setIsValidTelephone] = useState(false);

  const handleTelephoneChange = (event) => {
    const { value } = event.target;
    setTelephone(value);
    setIsValidTelephone(/^[789]\d{9}$/.test(value)); // Validate if telephone is 10 digits
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    setIsValidName(value.trim() !== ""); // Validate if name is not empty
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    setIsPasswordMatch(value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    setIsPasswordMatch(password === value);
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setIsValidEmail(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value));
  };

  return (
    <div className="centered-container">
      <div className="form-container">
        <>
          <div className="login-title">
            <h2 className="font-weight-bold">Client Signup</h2>
          </div>

          {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
          <Form>
            <Form.Group as={Col} controlId="formName">
              <Form.Control
                required
                type="text"
                className="mb-3 outline"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
                isValid={isValidName && name.trim() !== ""}
              />
              {isValidName && name.trim() !== "" && (
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} controlId="formEmail">
              <Form.Control
                required
                type="email"
                className="mb-3 outline "
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                isInvalid={!isValidEmail && email !== ""}
                isValid={isValidEmail}
              />
              {isValidEmail && (
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              )}
              {!isValidEmail && email !== "" && (
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              )}
            </Form.Group>

            

            <Form.Group as={Col} controlId="validationCustomPassword">
              <Form.Control
                required
                type="password"
                className={` mb-3 outline ${
                  password && password.length > 0 ? "is-valid" : ""
                }`}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />

              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="validationCustomConfirmPassword">
              <Form.Control
                required
                type="password"
                className={`mb-3 outline ${
                  confirmPassword &&
                  confirmPassword.length > 0 &&
                  !isPasswordMatch
                    ? "is-invalid"
                    : confirmPassword &&
                      confirmPassword.length > 0 &&
                      isPasswordMatch
                    ? "is-valid"
                    : ""
                }`}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />

              {!isPasswordMatch && confirmPassword && (
                <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
              )}
            </Form.Group>

            {/* <Form.Group as={Col} controlId="validationCustom03">
              <Form.Control
                type="text"
                className="mb-3 outline"
                placeholder="UserName"
                required
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group as={Col} controlId="formTelephone">
              <Form.Control
                type="tel"
                className="mb-3 outline"
                placeholder="Telephone Optional"
                value={telephone}
                onChange={handleTelephoneChange}
                isInvalid={!isValidTelephone && telephone !== ""}
                isValid={isValidTelephone && telephone !== ""}
              />
              {isValidTelephone && telephone !== "" && (
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              )}
            </Form.Group>

            <Button type="submit" className="custom-button mb-2">
              Register
            </Button>
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

export default ClientSignup;
