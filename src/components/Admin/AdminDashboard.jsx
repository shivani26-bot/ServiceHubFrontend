import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  approveRegistration,
  rejectRegistration,
  fetchPendingRegistrations,
} from "../../feature/pendingRegistrationSlice";

import AdminNavigation from "./AdminNavigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashBoard() {
  const dispatch = useDispatch();

  const authToken = useSelector((state) => state.auth.authToken);
  const pendingRegistration = useSelector(
    (state) => state.pendingRegistration.items
  );

  const status = useSelector((state) => state.pendingRegistration.status);
  const error = useSelector((state) => state.pendingRegistration.error);

  const notifySuccess = () =>
    toast.success("Approved Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyRejection = () =>
    toast.error("Rejected Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyFailure = (message) =>
    toast.error(message, {
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
    if (authToken) {
      dispatch(fetchPendingRegistrations(authToken));
    }
  }, [dispatch, authToken]);

  const handleApprove = (userId) => {
    dispatch(approveRegistration({ userId, authToken }))
      .then((response) => {
        if (
          response.payload === "Invalid user or registration already approved."
        ) {
          notifyFailure(response.payload);
        } else {
          notifySuccess();
          dispatch(fetchPendingRegistrations(authToken));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReject = (userId) => {
    dispatch(rejectRegistration({ userId, authToken }))
      .then((response) => {
        if (
          response.payload === "Invalid user or registration already rejected."
        ) {
          notifyFailure(response.payload);
        } else {
          notifyRejection();
          dispatch(fetchPendingRegistrations(authToken));
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <AdminNavigation />
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service Provider Details</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" && (
              <tr>
                <td colSpan="3">Loading...</td>
              </tr>
            )}
            {status === "failed" && (
              <tr>
                <td colSpan="3">Error: {error}</td>
              </tr>
            )}
            {status === "succeeded" &&
              pendingRegistration.map((provider) => (
                <tr key={provider.id}>
                  <td>
                    <strong>Company Name:</strong> {provider.companyName}
                    <br />
                    <strong>Phone:</strong> {provider.phone}
                    <br />
                    <strong>Email:</strong> {provider.email}
                  </td>
                  <td>{provider.approveStatus}</td>
                  <td>
                    <button
                      style={{
                        backgroundColor: "green",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "darkgreen")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "green")
                      }
                      onClick={() => handleApprove(provider.id)}
                    >
                      Approve
                    </button>
                    <button
                      style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "darkred")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "red")
                      }
                      onClick={() => handleReject(provider.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {status === "succeeded" && pendingRegistration.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}
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
    </>
  );
}
