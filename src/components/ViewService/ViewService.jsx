import { useEffect } from "react";

import BookService from "../BookService/BookService";
import ServiceDetail from "../ServiceCard/ServiceDetail";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchServiceDetails,
  resetStatus,
} from "../../feature/serviceDetailByIdSlice";
import { Row, Col } from "react-bootstrap";
import ClientNavigationBar from "../Navigation/ClientNavigationBar";

import Review from "../PostReview/Review";
export default function ViewService() {
  const { serviceId } = useParams();

  const authToken = useSelector((state) => state.auth.authToken);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.serviceDetail.status);
  const serviceDto = useSelector((state) => state.serviceDetail.serviceDto);

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
              <Col sm={7} className="service-detail">
                {serviceDto && <ServiceDetail service={serviceDto} />}
              </Col>
              <Col sm={5} className="book-service">
                {serviceDto && <BookService serviceId={serviceDto.id} />}
              </Col>
            </Row>

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
              <div style={{ textAlign: "center" }}>
                <div className="image-container">
                  <img
                    src="/empty.png"
                    alt="No Bookings"
                    className="centered-image"
                  />
                </div>
                <p>No reviews available</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
