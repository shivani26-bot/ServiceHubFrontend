import "./ClientBookings.css";
import ClientNavigationBar from "../../../components/Navigation/ClientNavigationBar";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";
import { fetchClientBookings } from "../../../feature/ClientBookingsSlice";
import { useNavigate } from "react-router-dom";

export default function ClientBookings() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  const reservations = useSelector((state) => state.reservations.items);
  const status = useSelector((state) => state.reservations.status);

  const navigate = useNavigate();

  useEffect(() => {
    if (authToken && userId) {
      dispatch(fetchClientBookings({ userId, authToken }));
    }
  }, [dispatch, authToken, userId]);

  const handleReview = (bookId, serviceId, userId) => {
    // Handle review logic here
    // console.log("rid", bookId, serviceId, userId);
    navigate(`/postReview/${bookId}/${serviceId}/${userId}`);
  };

  const isDatePassed = (date) => {
    const bookingDate = new Date(date);
    const currentDate = new Date();
    return bookingDate <= currentDate;
  };
  return (
    <>
      <ClientNavigationBar />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "succeeded" &&
              reservations.length > 0 &&
              reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.serviceName}</td>
                  <td>{new Date(reservation.bookDate).toLocaleDateString()}</td>
                  <td>{reservation.bookingStatus}</td>
                  <td>
                    {reservation.bookingStatus === "APPROVED" &&
                    isDatePassed(reservation.bookDate) ? (
                      <button
                        style={{
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "5px",
                          padding: "10px 20px",
                          cursor: "pointer",
                          fontSize: "16px",
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                          transition: "background-color 0.3s, box-shadow 0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#0056b3")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#007bff")
                        }
                        onClick={() =>
                          handleReview(
                            reservation.id,
                            reservation.serviceId,
                            reservation.userId
                          )
                        }
                      >
                        Review
                      </button>
                    ) : (
                      <span>No actions available</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {status === "succeeded" && reservations.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}

        {status === "loading" && <p>Loading reservations...</p>}
        {status === "failed" && <p>Failed to load reservations.</p>}
      </div>
    </>
  );
}
