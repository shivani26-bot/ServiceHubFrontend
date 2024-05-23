import React from "react";
import "./ClientBookings.css";
import ClientNavigationBar from "../../../components/Navigation/ClientNavigationBar";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchClientBookings } from "../../../feature/ClientBookingsSlice";
export default function ClientBookings() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  const reservations = useSelector((state) => state.reservations.items);
  const status = useSelector((state) => state.reservations.status);
  useEffect(() => {
    if (authToken && userId) {
      dispatch(fetchClientBookings({ userId, authToken }));
    }
  }, [dispatch, authToken, userId]);
  return (
    <>
      <ClientNavigationBar />
      <div className="table-container">
        {status === "loading" && <p>Loading reservations...</p>}
        {status === "succeeded" && reservations.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}
        {status === "succeeded" && reservations.length > 0 && (
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
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.serviceName}</td>
                  <td>{new Date(reservation.bookDate).toLocaleDateString()}</td>
                  <td>{reservation.bookingStatus}</td>
                  <td>{/* Add action buttons if needed */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {status === "failed" && <p>Failed to load reservations.</p>}
      </div>
    </>
  );
}
