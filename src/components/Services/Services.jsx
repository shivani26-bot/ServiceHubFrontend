import React from "react";
import CompanyNavigationBar from "../Navigation/CompanyNavigationBar";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../ServiceCard/ServiceCard";
import { fetchCompanyServices } from "../../feature/getCompanyServiceSlice";
import { useEffect } from "react";
import { useStore } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
export default function Services() {
  const dispatch = useDispatch();

  const store = useStore();
  console.log("State:", store.getState());
  const authToken = useSelector((state) => state.auth.authToken);
  const userId = useSelector((state) => state.auth.userId);
  const { companyServices, loading, error } = useSelector(
    (state) => state.getCompanyServices
  );
  console.log(authToken, userId);
  useEffect(() => {
    if (userId && authToken) {
      dispatch(fetchCompanyServices({ userId: userId, authToken: authToken }));
    }
  }, [dispatch, userId, authToken]);
  return (
    <>
      <CompanyNavigationBar />
      <div className="services-container">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && companyServices.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}
        {companyServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
        <ToastContainer
          position="top-right"
          autoClose={2000}
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
