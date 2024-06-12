import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CompanySignup.css";
import { useNavigate } from "react-router-dom";
import { companyRegister } from "../../../feature/displaySlice";
import { useDispatch } from "react-redux";
import { postCompanyData } from "../../../feature/apiSlice";
import Navigation from "../../Navigation/Navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanySignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [isValidTelephone, setIsValidTelephone] = useState(false);
  const [data, setData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });

  const notifySuccess = () =>
    toast.success("OTP has been sent successfully!", {
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

  const notifyFailure = (msg) =>
    toast.error(msg, {
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

  useEffect(() => {
    if (
      isValidName &&
      isValidEmail &&
      isValidAddress &&
      isValidTelephone &&
      isValidPassword &&
      isPasswordMatch
    ) {
      setValidated(true);
    } else setValidated(false);
  }, [
    isValidName,
    isValidEmail,
    isValidAddress,
    isValidTelephone,
    isValidPassword,
    isPasswordMatch,
  ]);
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      companyRegister({
        companyName: data.companyName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        address: data.address,
        phone: data.phone,
      })
    );

    dispatch(postCompanyData(data))
      .then((response) => {
        if (
          response.payload ===
          "Service Provider Already Registered with this Email"
        ) {
          notifyFailure(response.payload);
        } else {
          notifySuccess();
          setTimeout(() => {
            navigate("otp");
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData({ ...data, [name]: value });

    if (name === "companyName") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidName(isValid);
    }
    if (name === "email") {
      // either . or _ allowed between characters
      const isValid =
        /^(?!.*[._-]{2})(?!_)\w+(?:[._]\w+)*@\w+(?:[.-]?\w+)*\.\w{2,3}$/.test(
          value
        );
      setIsValidEmail(isValid);
    }
    if (name === "password") {
      const isValid =
        /^(?=.{8}$)(?:(?!.*[_@#!$]{2})[_@#!$a-zA-Z0-9][a-zA-Z0-9@#!$_]*)$/.test(
          value
        );

      setIsValidPassword(isValid);
    }
    if (name === "confirmPassword") {
      const isValid = data.password === value;
      setIsPasswordMatch(isValid);
    }
    if (name === "address") {
      const isValid = /^[0-9A-Za-z ,\-/():]+$/.test(value);
      setIsValidAddress(isValid);
    }
    if (name === "phone") {
      // either . or _ allowed between characters
      const isValid = /^[789]\d{9}$/.test(value);
      setIsValidTelephone(isValid);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <>
      <Navigation />
      <div className="gradient-background">
        <div className="blur-overlay"></div>
        <div
          style={{ marginTop: "40px" }}
          className=" content-container d-flex justify-content-center align-items-center "
        >
          <div
            className="form-container"
            style={{
              width: "500px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Company Signup
            </h2>
            {/* noValidate :Allows Custom Form Validation. form data should not be validated by the browser when submitted.  disables the default HTML form validation behavior provided by the browser. */}
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="CompanyName">
                <Form.Control
                  required
                  name="companyName"
                  type="text"
                  value={data.companyName}
                  className="outline"
                  onChange={handleChange}
                  placeholder="Company Name"
                  isInvalid={!isValidName && data.companyName !== ""}
                  isValid={isValidName}
                />

                {isValidName && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}
                {!isValidName && data.companyName !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Enter a Valid Company Name!
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Control
                  required
                  name="email"
                  type="email"
                  className="outline"
                  placeholder="Email"
                  value={data.email}
                  onChange={handleChange}
                  isInvalid={!isValidEmail && data.email !== ""}
                  isValid={isValidEmail}
                />
                {isValidEmail && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}
                {!isValidEmail && data.email !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Enter a valid email!
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group controlId="validationCustomPassword">
                <div className="input-wrapper">
                  <Form.Control
                    required
                    name="password"
                    // type="password"
                    type={isPasswordVisible ? "text" : "password"}
                    // className="outline"
                    style={{
                      border: "1px solid #121481",
                      borderRadius: "5px",
                      marginTop: "15px",
                    }}
                    placeholder="Password"
                    value={data.password}
                    onChange={handleChange}
                    isInvalid={!isValidPassword && data.password !== ""}
                    isValid={isValidPassword}
                  />
                  <img
                    src={isPasswordVisible ? "/hide.png" : "/show.png"}
                    alt="Toggle visibility"
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "30px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      width: "20px", // Adjust the size as needed
                      height: "20px",
                    }}
                  />
                </div>
                {/* {isValidPassword && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}
                {!isValidPassword && data.password !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Password must be 8 characters!
                    <br /> Only !@#$_ special characters allowed!
                    <br /> Combaination of !@#$_ special characters is not
                    allowed!
                  </Form.Control.Feedback>
                )} */}

                {isValidPassword && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}

                <p
                  style={{
                    color: "gray",
                    marginBottom: "5px",
                  }}
                >
                  Password must be 8 characters!
                  <br /> Only !@#$_ special characters allowed!
                </p>

                {/* <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group controlId="validationCustomConfirmPassword">
                <div className="input-wrapper">
                  <Form.Control
                    required
                    name="confirmPassword"
                    // type="password"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    // className="outline"
                    style={{
                      border: "1px solid #121481",
                      borderRadius: "5px",
                      marginBottom: "15px",
                    }}
                    placeholder="Confirm Password"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    isInvalid={!isPasswordMatch && data.confirmPassword !== ""}
                    isValid={isPasswordMatch}
                  />
                  <img
                    src={isConfirmPasswordVisible ? "/hide.png" : "/show.png"}
                    alt="Toggle visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "30px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      width: "20px", // Adjust the size as needed
                      height: "20px",
                    }}
                  />
                </div>
                {isPasswordMatch && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}

                {/* {!isPasswordMatch && data.confirmPassword !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Password doesn't match!
                  </Form.Control.Feedback>
                )} */}
              </Form.Group>

              <Form.Group controlId="Companyaddress">
                <Form.Control
                  name="address"
                  type="text"
                  className="outline"
                  placeholder="Address"
                  required
                  value={data.address}
                  onChange={handleChange}
                  isInvalid={!isValidAddress && data.address !== ""}
                  isValid={isValidAddress}
                />
                {isValidAddress && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}
                {!isValidAddress && data.address !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Enter a Valid Addess!
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group a controlId="formTelephone">
                <Form.Control
                  required
                  name="phone"
                  type="tel"
                  className="outline"
                  placeholder="Telephone"
                  value={data.phone}
                  onChange={handleChange}
                  isInvalid={!isValidTelephone && data.phone !== ""}
                  isValid={isValidTelephone}
                />
                {isValidTelephone && (
                  <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                )}
                {!isValidTelephone && data.phone !== "" && (
                  <Form.Control.Feedback type="invalid" className="mb-1">
                    Enter a Valid Phone Number!
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button
                style={{
                  width: "250px",
                  backgroundColor: validated ? "green" : "red",
                  color: "white",
                  margin: "15px auto 15px auto",
                }}
                disabled={!validated}
                className="d-flex justify-content-center align-items-center"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Form>
            <p className="d-flex justify-content-center align-items-center">
              Already have an account?
              <a href="/login" className="register-link font-weight-bold ">
                login now!
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

export default CompanySignup;
