import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function AdminNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = [
    {
      name: "Dashboard",
      href: "/adminDashboard",
      current: location.pathname === "/companyDashboard" ? true : false,
    },
    {
      name: "Logout",
      href: "/adminLogout",
      current: location.pathname === "/companyDashboard" ? true : false,
    },
  ];

  return (
    <Navbar expand="lg" className="sticky bg-red">
      <Container>
        <div className="brand-images">
          <img
            src="/public/ServiceHub4.PNG"
            alt="Second Logo"
            className="logo"
          />
        </div>
        <Navbar.Brand className="brand">ServiceHub Admin Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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
