import React from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ClientNavigationBar from "../../../components/Navigation/ClientNavigationBar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAllServices } from "../../../feature/getAllServicesSlice";
import { useSelector } from "react-redux";
import ClientServiceCard from "../../../components/ServiceCard/ClientServiceCard";
// import { useCookies } from "react-cookie";
export default function ClientDashBoard() {
  // const [cookies] = useCookies(["userCookie"]);
  // const authToken = cookies.userCookie;
  const authToken = useSelector((state) => state.auth.authToken);
  const services = useSelector((state) => state.getAllServices.items);
  const status = useSelector((state) => state.getAllServices.status);
  const searchResults = useSelector((state) => state.search.results);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authToken) {
      dispatch(fetchAllServices({ authToken: authToken }));
    }
  }, [dispatch, authToken]);

  return (
    <>
      <ClientNavigationBar />
      <SearchBar />

      <div className="service-list">
        {status === "loading" && <p>Loading services...</p>}
        {status === "succeeded" && services.length === 0 && (
          <div className="image-container">
            <img
              src="/empty.png"
              alt="No Bookings"
              className="centered-image"
            />
          </div>
        )}
        {status === "succeeded" &&
          (searchResults.length > 0
            ? searchResults.map((service) => (
                <ClientServiceCard key={service.id} service={service} />
              ))
            : services.map((service) => (
                <ClientServiceCard key={service.id} service={service} />
              )))}
        {status === "failed" && <p>Failed to load services.</p>}
      </div>
    </>
  );
}
