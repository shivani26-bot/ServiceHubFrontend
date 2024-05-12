import { Card, Button, Container } from "react-bootstrap";
import "./Register.css";
import { useNavigate } from "react-router-dom";
// import Navigation from "../Navigation/Navigation";

function Register() {
  const navigate = useNavigate();
  return (
    <Container
      style={{ marginTop: "200px" }}
      className=" text-center d-flex justify-content-center align-items-center"
    >
      <Card className="w-auto">
        <Card.Body className="card">
          <div className="mb-4">
            <p className="font-weight-bold fs-5 mb-2">
              Welcome To The Service Booking System!
            </p>
            <p className="mb-0">Choose your user type to get started:</p>
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
              Register as a Client
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
