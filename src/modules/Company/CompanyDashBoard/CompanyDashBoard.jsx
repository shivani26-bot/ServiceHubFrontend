import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import "./CompanyDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServiceProviderBookings } from "../../../feature/serviceProviderBookingsSlice";
import CompanyNavigationBar from "../../../components/Navigation/CompanyNavigationBar";
export default function CompanyDashBoard() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const serviceProviderId = useSelector((state) => state.auth.userId); // Assuming userId is the service provider ID
  const bookings = useSelector((state) => state.serviceProviderBookings.items);
  const status = useSelector((state) => state.serviceProviderBookings.status);

  useEffect(() => {
    if (authToken && serviceProviderId) {
      dispatch(
        fetchServiceProviderBookings({
          serviceproviderId: serviceProviderId,
          authToken,
        })
      );
    }
  }, [dispatch, authToken, serviceProviderId]);

  return (
    <>
      {/* <CompanyNavigationBar />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ClientName</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>
        <div className="image-container">
          <img src="/empty.png" alt="" className="centered-image" />
        </div>
      </div> */}

      <CompanyNavigationBar />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ClientName</th>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "succeeded" &&
              bookings.length > 0 &&
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.userName}</td>
                  <td>{booking.serviceName}</td>
                  <td>{new Date(booking.bookDate).toLocaleDateString()}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>{/* Add action buttons if needed */}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {status === "succeeded" && bookings.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}
        {status === "loading" && <p>Loading bookings...</p>}
        {status === "failed" && <p>Failed to load bookings.</p>}
      </div>
    </>
  );
}
