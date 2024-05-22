import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import "./BookService.css";
export default function BookService() {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookClick = () => {
    // Handle booking action here
    console.log("Book button clicked");
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
