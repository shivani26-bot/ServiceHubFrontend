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

import Review from "../PostReview/Review";
export default function ViewService() {
  const { serviceId } = useParams();
  console.log("serviceId", serviceId);
  const authToken = useSelector((state) => state.auth.authToken);
  console.log(authToken);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.serviceDetail.status);
  const serviceDto = useSelector((state) => state.serviceDetail.serviceDto);
  console.log("serviceauth", authToken, serviceDto);
  const reviewDtoList = useSelector(
    (state) => state.serviceDetail.reviewDtoList
  );

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
              <Col sm={8} className="service-detail">
                {serviceDto && <ServiceDetail service={serviceDto} />}
              </Col>
              <Col sm={4} className="book-service">
                {serviceDto && <BookService serviceId={serviceDto.id} />}
              </Col>
            </Row>
            {/* <Row>
              <Review serviceId={reviewDto} />
            </Row> */}
            <Row>
              {reviewDtoList && reviewDtoList.length > 0 ? (
                reviewDtoList.map((reviewDto, index) => (
                  <Review
                    key={index}
                    customerName={reviewDto.customerName}
                    review={reviewDto.review}
                    rating={reviewDto.rating}
                    reviewDate={reviewDto.reviewDate}
                  />
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </Row>
          </div>
        </div>
      </>
    );
  }
}
