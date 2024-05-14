import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function CompanyNavigationBar() {
  const location = useLocation();
  const navigation = [
    {
      name: "Dashboard",
      href: "/companyDashboard",
      current: location.pathname === "/companyDashboard" ? true : false,
    },
    {
      name: "PostAd",
      href: "/companyPostAd",
      current: location.pathname === "/companyPostAd" ? true : false,
    },
    {
      name: "Ads",
      href: "/companyAds",
      current: location.pathname === "/companyAds" ? true : false,
    },
    {
      name: "Logout",
      href: "/companyLogout",
      current: location.pathname === "/companyLogout" ? true : false,
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
