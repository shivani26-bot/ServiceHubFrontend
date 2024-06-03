import { Card, Button, Container } from "react-bootstrap";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Register() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation />
      <div className="gradient-background">
        <div className="blur-overlay"></div>
        <Container className="content-container  text-center d-flex justify-content-center align-items-center">
          <Card
            style={{ height: "auto", width: "410px" }}
            className="form-container"
          >
            <Card.Body>
              <div className="mb-4">
                <h2 className="font-weight-bold  mb-4">
                  Welcome To The Service Booking System!
                </h2>
                <p>Choose your user type to get started:</p>
              </div>
              <div className="d-flex flex-column">
                <Button
                  onClick={() => navigate("companySignup")}
                  className="custom-button mb-2"
                >
                  Register as a Company
                </Button>

                <Button
                  onClick={() => navigate("clientSignup")}
                  className="custom-button mt-2"
                >
                  Register as a Customer
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Register;
