import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Image from "react-bootstrap/Image";
import { useRef } from "react";
import "./PostAd.css";
import { useDispatch } from "react-redux";
import { postService } from "../../feature/apiSlice";

export default function PostAd() {
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const inputRef = useRef(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    img: "",
  });

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const imageUpload = (event) => {
    console.log(event);
    console.log(event.target);
    console.log(event.target.value);
    console.log(event.target.files);
    const file = event.target.files[0];
    console.log(file);
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
    if (file && file.size > maxSizeInBytes) {
      return;
    }
    setImage(file);

    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    if (isValidName && isValidPrice && isValidDescription) {
      // console.log("check");
      setValidated(true);
    } else setValidated(false);
  }, [isValidName, isValidPrice, isValidDescription]);

  const handleSubmit = () => {
    console.log(data);
    event.preventDefault();
    dispatch(postService(data));

    // navigate("otp");
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData({ ...data, [name]: value });

    if (name === "name") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidName(isValid);
    }

    if (name === "price") {
      const isValid = /^\d+(\.\d{2})?$/.test(value);
      setIsValidPrice(isValid);
    }
    if (name === "description") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidDescription(isValid);
    }
  };

  return (
    <div
      style={{ marginTop: "150px" }}
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
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Ad</h2>

        {/* <div className="d-flex justify-content-center align-item-center">
            <Button variant="success">Upload</Button>{" "}
          </div> */}
        {/* noValidate :Allows Custom Form Validation. form data should not be validated by the browser when submitted.  disables the default HTML form validation behavior provided by the browser. */}
        <div
          className="d-flex justify-content-center align-item-center "
          onClick={handleImageClick}
        >
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              onClick={() => document.getElementById("fileInput").click()}
              rounded
              className="imgdisplayafter"
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image
                src="holder.js/100px250"
                onClick={() => document.getElementById("fileInput").click()}
                rounded
              />

              <p style={{ textAlign: "center", color: "red" }}>
                Image must be less than 1MB!
              </p>
            </div>
          )}
          <input
            // id="fileInput"

            type="file"
            style={{ display: "none" }} //hides choose file button and no chosen file text
            // accept="image/*"
            onChange={imageUpload}
            ref={inputRef}
            name="img"
            value={data.img}
          />
        </div>

        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="CompanyName">
            <Form.Control
              required
              name="name"
              type="text"
              value={data.name}
              className="outline"
              onChange={handleChange}
              placeholder="ServiceName"
              isInvalid={!isValidName && data.name !== ""}
              isValid={isValidName}
            />

            {isValidName && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidName && data.name !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Enter a Valid Company Name!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group a controlId="formPrice">
            <Form.Control
              required
              name="price"
              type="tel"
              className="outline"
              placeholder="₹ Price"
              value={data.price}
              onChange={handleChange}
              isInvalid={!isValidPrice && data.price !== ""}
              isValid={isValidPrice}
            />
            {isValidPrice && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidPrice && data.price !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Enter a Valid Price!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="PostDescription">
            <Form.Control
              required
              name="description"
              type="text"
              value={data.description}
              className="outline"
              onChange={handleChange}
              placeholder="Description"
              isInvalid={!isValidDescription && data.description !== ""}
              isValid={isValidDescription}
            />

            {isValidDescription && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidDescription && data.description !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Enter a Valid Company Name!
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            style={{
              width: "100%",
              backgroundColor: validated ? "green" : "red",
              color: "white",
              margin: "15px auto 15px auto",
            }}
            disabled={!validated}
            className="d-flex justify-content-center align-items-center"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Form>
      </div>
    </div>
  );
}
