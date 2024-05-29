import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
import Image from "react-bootstrap/Image";
import { useRef } from "react";
import "./PostAd.css";
import { useDispatch } from "react-redux";
import { postService } from "../../feature/serviceSlice";
import CompanyNavigationBar from "../Navigation/CompanyNavigationBar";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function PostAd() {
  const navigate = useNavigate();
  // const [cookies, setCookie] = useCookies(["userCookie"]);
  const dispatch = useDispatch();
  // console.log(loginEmail, loginPassword);

  const [data, setData] = useState({
    serviceName: "",
    companyName: "",
    price: "",
    description: "",
    img: null,
  });

  const store = useStore();
  console.log("State:", store.getState());
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  const [isValidPrice, setIsValidPrice] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidCompanyName, setIsValidCompanyName] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);

  const [image, setImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const notifySuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyFailure = (msg) =>
    toast.error(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

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
    // setImage(file);

    // const { name, value } = event.target;

    // setData({ ...data, [name]: value });
    // setData({ ...data, img: image });

    setImage(file);
    setData({ ...data, img: file });
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData({ ...data, [name]: value });

    if (name === "serviceName") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidName(isValid);
    }

    if (name === "companyName") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidCompanyName(isValid);
    }

    if (name === "price") {
      const isValid = /^\d+(\.\d{2})?$/.test(value);
      setIsValidPrice(isValid);
    }
    if (name === "description") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.,/]*$/.test(value);
      setIsValidDescription(isValid);
    }
  };

  useEffect(() => {
    if (
      isValidName &&
      isValidCompanyName &&
      isValidPrice &&
      isValidDescription &&
      data.img !== null
    ) {
      // console.log("check");
      setValidated(true);
    } else setValidated(false);
  }, [
    isValidName,
    isValidCompanyName,
    isValidPrice,
    isValidDescription,
    data.img,
  ]);

  const handleSubmit = (event) => {
    console.log(data);
    console.log("authtok", authToken);
    console.log("uid", userId);
    event.preventDefault();

    // dispatch(
    //   postService({
    //     userId: userId,
    //     serviceName: data.serviceName,
    //     companyName: data.companyName,
    //     description: data.description,
    //     price: data.price,
    //     img: data.img,
    //     authToken: authToken,
    //   })
    // );

    dispatch(
      postService({
        userId: userId,
        serviceName: data.serviceName,
        companyName: data.companyName,
        description: data.description,
        price: data.price,
        img: data.img,
        authToken: authToken,
      })
    )
      .then((response) => {
        if (response.payload === "Service Added Successfully") {
          notifySuccess(response.payload);

          setTimeout(() => {
            navigate("/companyAds");
          }, 3000);
        } else {
          notifyFailure(response.payload);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error notification if needed
      });
  };

  return (
    <>
      <CompanyNavigationBar />

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
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Create Ad
          </h2>

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
              // value={data.img}
              accept="image/*"
            />
          </div>

          <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="ServiceName">
              <Form.Control
                required
                name="serviceName"
                type="text"
                value={data.serviceName}
                className="outline"
                onChange={handleChange}
                placeholder="Service Name"
                isInvalid={!isValidName && data.serviceName !== ""}
                isValid={isValidName}
              />

              {isValidName && (
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              )}
              {!isValidName && data.serviceName !== "" && (
                <Form.Control.Feedback type="invalid" className="mb-1">
                  Enter a Valid Company Name!
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="CompanyName">
              <Form.Control
                required
                name="companyName"
                type="text"
                value={data.companyName}
                className="outline"
                onChange={handleChange}
                placeholder="Company Name"
                isInvalid={!isValidCompanyName && data.companyName !== ""}
                isValid={isValidCompanyName}
              />

              {isValidCompanyName && (
                <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              )}
              {!isValidCompanyName && data.companyName !== "" && (
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
                as="textarea"
                rows={5}
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
                  Enter a Valid!
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
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </div>
    </>
  );
}
