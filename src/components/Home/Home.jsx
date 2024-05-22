// import React from "react";
// import SearchBar from "../SearchBar/SearchBar";
// import Navigation from "../Navigation/Navigation";
// export default function Home() {
//   return (
//     <>
//       <Navigation />
//       <SearchBar />
//     </>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../ServiceCard/ServiceCard";
import SearchBar from "../SearchBar/SearchBar";
import Navigation from "../Navigation/Navigation";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchAllServices } from "../../feature/getAllServicesSlice";
export default function Home() {
  // const [services, setServices] = useState([]);
  // useEffect(() => {
  //   const fetchServices = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:9000/services");
  //       setServices(response.data);
  //     } catch (error) {
  //       console.error("Error fetching services:", error);
  //     }
  //   };
  //   fetchServices();
  // }, []);
  // return (
  //   <>
  //     <Navigation />
  //     <SearchBar />
  //     <div className="services-container">
  //       {services.map((service) => (
  //         <ServiceCard key={service.id} service={service} />
  //       ))}
  //     </div>
  //   </>
  // );

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services.items);
  const status = useSelector((state) => state.services.status);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllServices());
    }
  }, [status, dispatch]);

  return (
    <>
      <Navigation />
      <SearchBar />
      <div className="services-container">
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" &&
          services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
      </div>
    </>
  );
}
