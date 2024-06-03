import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import ClientNavigationBar from "../Navigation/ClientNavigationBar";
import { useDispatch, useSelector } from "react-redux";
import { postReview } from "../../feature/reviewSlice";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostReview() {
  const { bookId, serviceId, userId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({ review: "", rating: null });
  const authToken = useSelector((state) => state.auth.authToken);
  const notifySuccess = () =>
    toast.success("Thank you for sharing your feedback with us!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const dispatch = useDispatch();
  const handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    // console.log(data);

    const { review, rating } = data;
    // console.log(review, rating, bookId, serviceId, userId);

    dispatch(
      postReview({
        review,
        rating,
        serviceId,
        bookId,
        userId,
        authToken,
      })
    );
    notifySuccess();
    setTimeout(() => {
      navigate("/clientDashboard");
    }, 5000);
  };

  return (
    <>
      <ClientNavigationBar />

      <div
        style={{ marginTop: "160px", marginBottom: "100px" }}
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
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="PostComment">
              <Form.Label> Comment:</Form.Label>
              <Form.Control
                name="review"
                value={data.review}
                as="textarea"
                rows={3}
                onChange={handleChange}
              />
            </Form.Group>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend">
                Your feedback fuels our journey. Share your experience and help
                us craft better moments together.{" "}
                <span style={{ fontWeight: "bold", color: "#FFA500" }}>
                  Rate now!
                </span>
              </Typography>
              <Rating
                name="rating"
                value={data.rating}
                onChange={handleChange}
              />
            </Box>
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
              onClick={handleSubmit}
            >
              Post
            </Button>
          </Form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}
