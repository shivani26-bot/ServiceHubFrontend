import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function ClientNavigationBar() {
  const location = useLocation();
  const navigation = [
    {
      name: "Dashboard",
      href: "/clientDashboard",
      current: location.pathname === "/clientDashboard" ? true : false,
    },
    {
      name: "Bookings",
      href: "/clientBookings",
      current: location.pathname === "/clientBookings" ? true : false,
    },

    {
      name: "Logout",
      href: "/clientLogout",
      current: location.pathname === "/clientLogout" ? true : false,
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
