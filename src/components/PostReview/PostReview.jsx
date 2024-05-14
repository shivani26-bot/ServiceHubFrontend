import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
export default function PostReview() {
  return (
    <div
      style={{ marginTop: "200px", marginBottom: "100px" }}
      className="d-flex justify-content-center align-items-center "
    >
      <div
        style={{
          width: "500px",
          padding: "20px",
          border: "1px solid #121481",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Post Review
        </h2>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button
            style={{
              width: "100%",

              color: "white",
              backgroundColor: "black",
              margin: "15px auto 15px auto",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#121481")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#000000")}
            // //   disabled={!validated}
            className="d-flex justify-content-center align-items-center"
            //   onClick={handleSubmit}
          >
            Post
          </Button>
        </Form>
      </div>
    </div>
  );
}
