import { useEffect } from "react";
import React from "react";
import BookService from "../BookService/BookService";
import ServiceDetail from "../ServiceCard/ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchServiceDetails } from "../../feature/serviceDetailByIdSlice";
import { Row, Col } from "react-bootstrap";
import ClientNavigationBar from "../Navigation/ClientNavigationBar";
import { resetStatus } from "../../feature/serviceDetailByIdSlice";

export default function ViewService() {
  const { serviceId } = useParams();
  console.log("serviceId", serviceId);
  const authToken = useSelector((state) => state.auth.authToken);
  console.log(authToken);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.serviceDetail.status);
  const serviceDto = useSelector((state) => state.serviceDetail.serviceDto);
  console.log("serviceauth", authToken, serviceDto);

  useEffect(() => {
    // Reset status to idle whenever serviceId changes
    dispatch(fetchServiceDetails({ serviceId, authToken }));
    return () => {
      dispatch(resetStatus()); // Reset status when component unmounts
    };
  }, [serviceId, authToken, dispatch]);

  if (status === "idle" || !serviceDto) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (status === "failed") {
    return <div>Error: Failed to fetch service details</div>;
  }

  if (status === "succeeded") {
    return (
      <>
        <ClientNavigationBar />
        <div className="view-ad-page">
          <div className="service-details-container">
            <Row>
              <Col sm={12} className="service-detail">
                {serviceDto && <ServiceDetail service={serviceDto} />}
              </Col>
              <Col sm={4} className="book-service">
                {serviceDto && <BookService serviceId={serviceDto.id} />}
              </Col>
            </Row>
          </div>
        </div>
      </>
    );
  }
}
