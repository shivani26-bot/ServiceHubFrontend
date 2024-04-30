import { Card, Button, Container } from "react-bootstrap";
import "./Register.css";
function Register() {
  return (
    <Container className=" text-center d-flex justify-content-center align-items-center vh-100 ">
      <Card className="w-auto">
        <Card.Body className="card">
          <div className="mb-4">
            <p className="font-weight-bold fs-5 mb-2">
              Welcome To The Service Booking System!
            </p>
            <p className="mb-0">Choose your user type to get started:</p>
          </div>
          <div className="d-flex flex-column">
            <Button className="custom-button mb-2">
              Register as a Company
            </Button>
            <Button className="custom-button mt-2">Register as a Client</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>

    // <Card className="text-center">
    //   <Card.Header>Featured</Card.Header>
    //   <Card.Body>
    //     <Card.Title>Special title treatment</Card.Title>
    //     <Card.Text>
    //       With supporting text below as a natural lead-in to additional content.
    //     </Card.Text>
    //     <div className="d-flex flex-column">
    //       <Button className="custom-button mb-2" variant="dark">
    //         Register as a Company
    //       </Button>
    //       <Button className="custom-button mb-2" variant="dark">
    //         Register as a Client
    //       </Button>
    //     </div>
    //   </Card.Body>
    // </Card>
  );
}

export default Register;
