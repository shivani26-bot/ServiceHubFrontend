import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function AdminMainNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [
    {
      name: "Register",
      href: "/adminRegister",
      current: location.pathname === "/adminRegister" ? true : false,
    },
    {
      name: "Login",
      href: "/adminLogin",
      current: location.pathname === "/adminLogin" ? true : false,
    },
  ];

  return (
    <Navbar expand="lg" className="sticky bg-red" variant="dark">
      <Container>
        <div className="brand-images">
          <img src="/ServiceHub4.PNG" alt="Second Logo" className="logo" />
        </div>
        <Navbar.Brand className="brand">ServiceHub Admin Portal</Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ borderColor: "white" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" variant="pills">
            {navigation.map((item, index) => (
              <Nav.Item style={{ marginRight: "20px" }} key={index}>
                <Nav.Link
                  // href={item.href}
                  onClick={() => navigate(item.href)}
                  className={item.current ? "active" : ""}
                >
                  {item.name}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminMainNavigation;
