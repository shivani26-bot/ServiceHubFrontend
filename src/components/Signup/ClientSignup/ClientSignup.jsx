// import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import "./ClientSignup.css";
// import { useNavigate } from "react-router-dom";
// function ClientSignup() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [isValidEmail, setIsValidEmail] = useState(false);

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isPasswordMatch, setIsPasswordMatch] = useState(false);

//   const [name, setName] = useState("");
//   const [isValidName, setIsValidName] = useState(false);

//   const [telephone, setTelephone] = useState("");
//   const [isValidTelephone, setIsValidTelephone] = useState(false);

//   const handleTelephoneChange = (event) => {
//     const { value } = event.target;
//     setTelephone(value);
//     setIsValidTelephone(/^[789]\d{9}$/.test(value)); // Validate if telephone is 10 digits
//   };

//   const handleNameChange = (event) => {
//     const { value } = event.target;
//     setName(value);
//     setIsValidName(value.trim() !== ""); // Validate if name is not empty
//   };

//   const handlePasswordChange = (event) => {
//     const { value } = event.target;
//     setPassword(value);
//     setIsPasswordMatch(value === confirmPassword);
//   };

//   const handleConfirmPasswordChange = (event) => {
//     const { value } = event.target;
//     setConfirmPassword(value);
//     setIsPasswordMatch(password === value);
//   };
//   const handleEmailChange = (event) => {
//     const { value } = event.target;
//     setEmail(value);
//     setIsValidEmail(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value));
//   };

//   return (
//     <div
//       style={{ marginTop: "150px" }}
//       className=" d-flex justify-content-center align-items-center "
//     >
//       <div className="form-container">
//         <>
//           <div className="login-title">
//             <h2 className="font-weight-bold">Client Signup</h2>
//           </div>

//           {/* <Form noValidate validated={validated} onSubmit={handleSubmit}> */}
//           <Form>
//             <Form.Group as={Col} controlId="formName">
//               <Form.Control
//                 required
//                 type="text"
//                 className="mb-3 outline"
//                 placeholder="Name"
//                 value={name}
//                 onChange={handleNameChange}
//                 isValid={isValidName && name.trim() !== ""}
//               />
//               {isValidName && name.trim() !== "" && (
//                 <Form.Control.Feedback type="valid"></Form.Control.Feedback>
//               )}
//             </Form.Group>

//             <Form.Group as={Col} controlId="formEmail">
//               <Form.Control
//                 required
//                 type="email"
//                 className="mb-3 outline "
//                 placeholder="Email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 isInvalid={!isValidEmail && email !== ""}
//                 isValid={isValidEmail}
//               />
//               {isValidEmail && (
//                 <Form.Control.Feedback type="valid"></Form.Control.Feedback>
//               )}
//               {!isValidEmail && email !== "" && (
//                 <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//               )}
//             </Form.Group>

//             <Form.Group as={Col} controlId="validationCustomPassword">
//               <Form.Control
//                 required
//                 type="password"
//                 className={` mb-3 outline ${
//                   password && password.length > 0 ? "is-valid" : ""
//                 }`}
//                 placeholder="Password"
//                 value={password}
//                 onChange={handlePasswordChange}
//               />

//               <Form.Control.Feedback type="valid"></Form.Control.Feedback>
//               <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group as={Col} controlId="validationCustomConfirmPassword">
//               <Form.Control
//                 required
//                 type="password"
//                 className={`mb-3 outline ${
//                   confirmPassword &&
//                   confirmPassword.length > 0 &&
//                   !isPasswordMatch
//                     ? "is-invalid"
//                     : confirmPassword &&
//                       confirmPassword.length > 0 &&
//                       isPasswordMatch
//                     ? "is-valid"
//                     : ""
//                 }`}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={handleConfirmPasswordChange}
//               />

//               {!isPasswordMatch && confirmPassword && (
//                 <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//               )}
//             </Form.Group>

//             {/* <Form.Group as={Col} controlId="validationCustom03">
//               <Form.Control
//                 type="text"
//                 className="mb-3 outline"
//                 placeholder="UserName"
//                 required
//               />
//               <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
//             </Form.Group> */}

//             <Form.Group as={Col} controlId="formTelephone">
//               <Form.Control
//                 type="tel"
//                 className="mb-3 outline"
//                 placeholder="Telephone Optional"
//                 value={telephone}
//                 onChange={handleTelephoneChange}
//                 isInvalid={!isValidTelephone && telephone !== ""}
//                 isValid={isValidTelephone && telephone !== ""}
//               />
//               {isValidTelephone && telephone !== "" && (
//                 <Form.Control.Feedback type="valid"></Form.Control.Feedback>
//               )}
//             </Form.Group>

//             <Button
//               onClick={() => navigate("otp")}
//               type="submit"
//               className="custom-button mb-2"
//             >
//               Register
//             </Button>
//           </Form>

//           <p>
//             Or{" "}
//             <a
//               href="/login"
//               className="register-link font-weight-bold fs-6 mb-0"
//             >
//               login now!
//             </a>
//           </p>
//         </>
//       </div>
//     </div>
//   );
// }

// export default ClientSignup;

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./ClientSignup.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { customerRegister } from "../../../feature/displaySlice";
import { postCustomerData } from "../../../feature/apiSlice";
function ClientSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isValidTelephone, setIsValidTelephone] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
  });

  useEffect(() => {
    if (
      isValidName &&
      isValidEmail &&
      isValidTelephone &&
      isValidPassword &&
      isPasswordMatch
    ) {
      // console.log("check");
      setValidated(true);
    } else setValidated(false);
  }, [
    isValidName,
    isValidEmail,
    isValidTelephone,
    isValidPassword,
    isPasswordMatch,
  ]);
  const handleSubmit = () => {
    console.log(data);

    // axios.put(`http://localhost:9000/regenerate-otp?email=${data.email}`);
    dispatch(
      customerRegister({
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        telephone: data.telephone,
      })
    );
    dispatch(postCustomerData(data));

    navigate("otp");
  };

  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData({ ...data, [name]: value });
    if (name === "name") {
      const isValid = /^[A-Za-z0-9][A-Za-z0-9\s&'-.]*$/.test(value);
      setIsValidName(isValid);
    }
    if (name === "email") {
      // either . or _ allowed between characters
      const isValid =
        /^(?!.*[._-]{2})(?!_)\w+(?:[._]\w+)*@\w+(?:[.-]?\w+)*\.\w{2,3}$/.test(
          value
        );
      setIsValidEmail(isValid);
    }
    if (name === "password") {
      const isValid =
        /^(?=.{8}$)(?:(?!.*[_@#!$]{2})[_@#!$a-zA-Z0-9][a-zA-Z0-9@#!$_]*)$/.test(
          value
        );

      setIsValidPassword(isValid);
    }
    if (name === "confirmPassword") {
      const isValid = data.password === value;
      setIsPasswordMatch(isValid);
    }
    if (name === "telephone") {
      // either . or _ allowed between characters
      const isValid = /^[789]\d{9}$/.test(value);
      setIsValidTelephone(isValid);
    }
  };

  return (
    <div
      style={{ marginTop: "100px", marginBottom: "100px" }}
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
          Customer Signup
        </h2>
        {/* noValidate :Allows Custom Form Validation. form data should not be validated by the browser when submitted.  disables the default HTML form validation behavior provided by the browser. */}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Control
              required
              name="name"
              type="text"
              value={data.name}
              className="outline"
              onChange={handleChange}
              placeholder="Name"
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

          <Form.Group controlId="formEmail">
            <Form.Control
              required
              name="email"
              type="email"
              className="outline "
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              isInvalid={!isValidEmail && data.email !== ""}
              isValid={isValidEmail}
            />
            {isValidEmail && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidEmail && data.email !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Enter a valid email!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group controlId="validationCustomPassword">
            <Form.Control
              required
              name="password"
              type="password"
              className="outline"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              isInvalid={!isValidPassword && data.password !== ""}
              isValid={isValidPassword}
            />
            {isValidPassword && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidPassword && data.password !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Password must be 8 characters!
                <br /> Only !@#$_ special characters allowed!
                <br /> Combaination of !@#$_ special characters is not allowed!
              </Form.Control.Feedback>
            )}
            {/* <Form.Control.Feedback type="valid"></Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback> */}
          </Form.Group>

          <Form.Group controlId="validationCustomConfirmPassword">
            <Form.Control
              required
              name="confirmPassword"
              type="password"
              className="outline"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
              isInvalid={!isPasswordMatch && data.confirmPassword !== ""}
              isValid={isPasswordMatch}
            />
            {isPasswordMatch && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}

            {!isPasswordMatch && data.confirmPassword !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Password doesn't match!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group a controlId="formTelephone">
            <Form.Control
              required
              name="telephone"
              type="tel"
              className="outline"
              placeholder="Telephone"
              value={data.telephone}
              onChange={handleChange}
              isInvalid={!isValidTelephone && data.telephone !== ""}
              isValid={isValidTelephone}
            />
            {isValidTelephone && (
              <Form.Control.Feedback type="valid"></Form.Control.Feedback>
            )}
            {!isValidTelephone && data.telephone !== "" && (
              <Form.Control.Feedback type="invalid" className="mb-1">
                Enter a Valid Phone Number!
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Button
            style={{
              width: "250px",
              backgroundColor: validated ? "green" : "red",
              color: "white",
              margin: "15px auto 15px auto",
            }}
            disabled={!validated}
            className="d-flex justify-content-center align-items-center"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Form>
        <p className="d-flex justify-content-center align-items-center">
          Already have an account?
          <a href="/login" className="register-link font-weight-bold ">
            login now!
          </a>
        </p>
      </div>
    </div>
  );
}

export default ClientSignup;
