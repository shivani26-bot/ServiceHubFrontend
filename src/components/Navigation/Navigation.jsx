import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navigation.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: location.pathname === "/" ? true : false,
    },
    {
      name: "Register",
      href: "/register",
      current: location.pathname === "/register" ? true : false,
    },

    {
      name: "Login",
      href: "/login",
      current: location.pathname === "/login" ? true : false,
    },
  ];

  return (
    <Navbar expand="lg" className="sticky bg-red">
      <Container>
        <Navbar.Brand className="brand">ServiceHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" variant="pills">
            {navigation.map((item, index) => (
              <Nav.Item style={{ marginRight: "20px" }} key={index}>
                <Nav.Link
                  href={item.href}
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

export default Navigation;
