import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import "./CompanyDashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServiceProviderBookings } from "../../../feature/serviceProviderBookingsSlice";
import CompanyNavigationBar from "../../../components/Navigation/CompanyNavigationBar";
import { useState } from "react";
import { changeBookingStatus } from "../../../feature/bookingStatusSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CompanyDashBoard() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  const serviceProviderId = useSelector((state) => state.auth.userId); // Assuming userId is the service provider ID
  const bookings = useSelector((state) => state.serviceProviderBookings.items);
  const status = useSelector((state) => state.serviceProviderBookings.status);
  const [localBookings, setLocalBookings] = useState([]);
  const notifySuccess = () =>
    toast.success("Booking Approved Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const notifyFailure = () =>
    toast.error("Booking Rejected Successfully!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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

  useEffect(() => {
    console.log(status);
    if (status === "succeeded") {
      setLocalBookings(bookings);
    }
    console.log(bookings);
  }, [status, bookings]);

  const handleApprove = (id, customerId) => {
    // console.log("Clicked booking ID:", id);
    // console.log("Previous local bookings:", localBookings);
    // setLocalBookings((prevBookings) => {
    //   const updatedBookings = prevBookings.map((booking) => {
    //     console.log("Processing booking ID:", booking.id);
    //     if (booking.id === id) {
    //       console.log("Updating booking ID:", booking.id);
    //       return { ...booking, bookingStatus: "APPROVED" };
    //     }
    //     return booking;
    //   });
    //   console.log("Updated bookings:", updatedBookings);
    //   return updatedBookings;
    // });

    dispatch(
      changeBookingStatus({
        bookingId: id,
        customerId,
        status: "Approve",
        authToken,
      })
    )
      .unwrap()
      .then(() => {
        setLocalBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id
              ? { ...booking, bookingStatus: "APPROVED" }
              : booking
          )
        );
        notifySuccess();
      })

      .catch((error) => {
        console.error("Error approving booking:", error);
      });
  };

  const handleReject = (id, customerId) => {
    dispatch(
      changeBookingStatus({
        bookingId: id,
        customerId,
        status: "Reject",
        authToken,
      })
    )
      .unwrap()
      .then(() => {
        setLocalBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === id
              ? { ...booking, bookingStatus: "REJECTED" }
              : booking
          )
        );
        notifyFailure();
      })
      .catch((error) => {
        console.error("Error rejecting booking:", error);
      });
  };

  return (
    <>
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
              localBookings.length > 0 &&
              localBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.userName}</td>
                  <td>{booking.serviceName}</td>
                  <td>{new Date(booking.bookDate).toLocaleDateString()}</td>
                  <td>{booking.bookingStatus}</td>
                  <td>
                    {booking.bookingStatus === "PENDING" ? (
                      <>
                        <button
                          onClick={() =>
                            handleApprove(booking.id, booking.userId)
                          }
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleReject(booking.id, booking.userId)
                          }
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>No actions available</span>
                    )}
                  </td>
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
    </>
  );
}
