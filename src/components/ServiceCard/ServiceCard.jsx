import React from "react";
import "./ServiceCard.css"; // Assuming you have some CSS for styling
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteService } from "../../feature/deleteServiceSlice";
import { useSelector } from "react-redux";
const ServiceCard = ({ service }) => {
  const { id, serviceName, price, description, imageUrl } = service;
  console.log("id", id);
  const authToken = useSelector((state) => state.auth.authToken);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteService({ serviceId: service.id, authToken }));
  };

  return (
    <div className="service-card">
      <img
        src={service.imageUrl}
        alt={service.serviceName}
        className="service-card-img"
      />
      <div className="service-card-details">
        <h3>{service.serviceName}</h3>
        <hr />
        <p>
          <strong>Price:</strong> {service.price}
        </p>
        <p>
          <strong>Description:</strong> {service.description}
        </p>
        <hr />
        <div className="service-card-actions">
          <button className="update-button">Update</button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string,
    serviceName: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
  }).isRequired,
};
export default ServiceCard;
