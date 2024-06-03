import { useState, useEffect, useRef } from "react";
import { Container, Col, Form, Button, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { regenerateOTP, verifyOTP } from "../../feature/apiSlice";

import Navigation from "../Navigation/Navigation";
import { verifyServiceProviderOTP } from "../../feature/apiSlice";
function Otp() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(59);
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const companyEmail = useSelector((state) => state.display.company.email);
  const customerEmail = useSelector((state) => state.display.customer.email);

  const navigate = useNavigate();
  const notifyRegister = () =>
    toast.success("Registered Successfully!", {
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
  const notifyWait = (msg) =>
    toast.success(msg, {
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
  const notify = () =>
    toast.success("OTP sent successfully!", {
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

  const resendOTP = () => {
    setMinutes(0);
    setSeconds(59);
    if (companyEmail) dispatch(regenerateOTP(companyEmail));
    if (customerEmail) dispatch(regenerateOTP(customerEmail));
  };

  useEffect(
    () => {
      const interval = setInterval(() => {
        // decrease seconds if greater than 0
        if (seconds > 0) setSeconds(seconds - 1);
        // when seconds reach 0, decrease minutes if greater than 0
        if (seconds === 0) {
          if (minutes === 0) {
            // stop the countdown when both minutes and seconds are 0
            clearInterval(interval);
          } else {
            // reset seconds to 59 and decrease minutes by 1
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    },
    [seconds],
    [minutes]
  );

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const otpString = otp.join("");
    // console.log(otpString);
    let email;
    let isCustomer = false;

    if (customerEmail) {
      email = customerEmail;
      isCustomer = true;
    } else if (companyEmail) {
      email = companyEmail;
    }

    // console.log("customerEmail", customerEmail);
    // console.log("companyEmail", companyEmail);

    if (isCustomer) {
      dispatch(verifyOTP({ email, otp: otpString }))
        .then((response) => {
          if (
            response.payload ===
            "Congratulations! Your OTP has been successfully verified. You can now proceed to login to ServiceHub and explore our services."
          ) {
            notifyRegister();
            setTimeout(() => {
              navigate("/login");
            }, 4000);
          } else {
            notifyFailure(response.payload);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      dispatch(verifyServiceProviderOTP({ email, otp: otpString }))
        .then((response) => {
          if (
            response.payload ===
            "Success! Your OTP has been verified. Please await approval from the ServiceHubAdmin"
          ) {
            notifyWait(response.payload);
            setTimeout(() => {
              navigate("/login");
            }, 4000);
          } else {
            notifyFailure(response.payload);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <>
      <Navigation />
      <div className="gradient-background">
        <div className="blur-overlay"></div>
        <Container
          style={{ marginTop: "30px" }}
          className="content-container text-center d-flex justify-content-center align-items-center "
        >
          <Col>
            <Card
              style={{ height: "auto", width: "400px", margin: "auto" }}
              className="form-container"
            >
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <h2>
                    <strong>Two Step Verification</strong>
                  </h2>
                </Card.Title>
                <Card.Subtitle className="text-center mb-4">
                  <p>Enter 6 digit OTP sent to the registered email id</p>
                </Card.Subtitle>

                <Form onSubmit={handleSubmit}>
                  <div className="d-flex justify-content-center mb-4 ">
                    {otp.map((digit, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        className="outline"
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        style={{
                          width: "40px",
                          height: "40px",
                          margin: "4px",

                          textAlign: "center",
                        }}
                        ref={(input) => (inputRefs.current[index] = input)}
                      />
                    ))}
                  </div>
                  <div className="text-center ">
                    <Button
                      style={{
                        backgroundColor: "#000000",
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#121481")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#000000")
                      }
                      variant="dark"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
                <div style={{ marginTop: "20px" }}>
                  <p
                    style={{
                      color: "#121481",
                      fontWeight: "bold",
                    }}
                  >
                    Time Remaining:
                    <span
                      style={{
                        marginRight: "39px",
                      }}
                    >
                      {" "}
                      {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                    <Button
                      href="#"
                      disabled={seconds > 0 || minutes > 0}
                      style={{
                        color: seconds > 0 || minutes > 0 ? "black" : "white",
                        backgroundColor:
                          seconds > 0 || minutes > 0 ? "#CCCCCC" : "black",
                      }}
                      onClick={() => {
                        if (resendOTP) {
                          resendOTP();
                        }
                        if (notify) {
                          notify();
                        }
                      }}
                    >
                      Resend OTP
                    </Button>
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
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
}

export default Otp;
