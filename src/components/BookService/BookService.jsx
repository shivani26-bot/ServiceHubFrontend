import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./BookService.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addBooking } from "../../feature/addBookingsSlice";
export default function BookService() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  console.log("uidauthsid", userId, authToken, serviceId);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookClick = () => {
    // Handle booking action here
    console.log("Book button clicked");
    if (selectedDate) {
      const bookingData = {
        serviceId: parseInt(serviceId, 10), // Ensure serviceId is an integer
        userId: userId,
        bookDate: selectedDate.toISOString(), // Convert date to ISO string
      };
      dispatch(addBooking({ bookingData, authToken }))
        .unwrap()
        .then(() => {
          navigate("/clientBookings");
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
          dateFormat="dd/MM/yyyy"
          minDate={today}
        />
      </div>
      <button className="book-button" onClick={handleBookClick}>
        Book
      </button>
    </div>
  );
}
