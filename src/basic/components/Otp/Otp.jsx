import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card } from "react-bootstrap";
function Otp() {
  const initialCountdown = 180;
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);

  const [countdown, setCountdown] = useState(180); // 3 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown === 0) {
        setCountdown(initialCountdown); // Reset countdown to initial value
      } else {
        setCountdown(countdown - 1); // Decrease countdown by 1 every second
      }
    }, 1000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, [countdown, initialCountdown]);

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle OTP submission
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Container
      style={{ marginTop: "200px" }}
      className=" text-center d-flex justify-content-center align-items-center "
    >
      <Col>
        {" "}
        {/* Increase the width of the card */}
        <Card style={{ width: "400px", height: "300px", margin: "auto" }}>
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
                    style={{
                      width: "40px",
                      height: "40px",
                      margin: "4px", // Add margin-right to all boxes except the last one
                      //   marginLeft: index === 0 ? "1px" : "0", // Add margin-left to the first box
                      textAlign: "center",
                    }}
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
                Didn't get the code? Resend {formatTime(countdown)}
              </p>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
}

export default Otp;