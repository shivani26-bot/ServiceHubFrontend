import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

import "./BookService.css";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addBooking } from "../../feature/addBookingsSlice";
export default function BookService() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const authToken = useSelector((state) => state.auth.authToken);
  // const userId = useSelector((state) => state.auth.userId);
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  // console.log("uidauthsid", userId, authToken, serviceId);
  const handleDateChange = (date) => {
    const normalizedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    // console.log("Normalized date", normalizedDate.toLocaleDateString("en-CA"));
    setSelectedDate(normalizedDate);
  };
  const notifySuccess = () =>
    toast.success(
      "Service successfully booked. Please await approval from the service provider.",
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );

  const handleBookClick = () => {
    if (selectedDate) {
      const bookingData = {
        serviceId: parseInt(serviceId, 10),
        userId: userId,
        bookDate: selectedDate.toLocaleDateString("en-CA"),
      };
      dispatch(addBooking({ bookingData, authToken }))
        .unwrap()
        .then(() => {
          notifySuccess();
          setTimeout(() => {
            navigate("/clientBookings");
          }, 4000);
        })
        .catch((error) => {
          console.error("Error booking service:", error);
          alert("Failed to book the service. Please try again.");
        });
    } else {
      alert("Please select a date");
    }
  };

  return (
    <div className="book-service-container">
      <h2>Book Service</h2>
      <div className="date-picker-container">
        <div
          className="calendar-icon"
          onClick={() => document.getElementById("date-picker").click()}
        >
          <FaCalendarAlt />
        </div>
        <DatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={handleDateChange}
          className="date-picker"
          placeholderText="Select Date"
          dateFormat="yyyy/MM/dd"
          minDate={today}
        />
      </div>
      <button className="book-button" onClick={handleBookClick}>
        Book
      </button>
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
    </div>
  );
}
