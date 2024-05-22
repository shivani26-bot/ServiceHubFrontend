import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { searchServiceByName } from "../../feature/searchSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const authToken = useSelector((state) => state.auth.authToken);
  const handleSearch = () => {
    dispatch(searchServiceByName({ name: searchQuery, authToken }));
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Form className="d-flex">
        <Form.Control
          style={{ border: "2px solid #121481", width: "500px" }}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          style={{ backgroundColor: "black" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#121481")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Form>
    </Container>
  );
}
