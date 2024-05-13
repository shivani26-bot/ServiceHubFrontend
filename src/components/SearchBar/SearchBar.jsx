import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function SearchBar() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form className="d-flex">
        <Form.Control
          style={{ border: "2px solid #121481", width: "500px" }}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button
          style={{ backgroundColor: "black" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#121481")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
        >
          Search
        </Button>
      </Form>
    </Container>
  );
}
