import React from "react";
import { useNavigate } from "react-router-dom";

const ClientServiceCard = ({ service }) => {
  const { serviceName, price, description, imageUrl, companyName } = service;
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to /client/viewAd
    navigate("/client/viewAd");
  };
  return (
    <div className="service-card">
      <img src={imageUrl} alt={serviceName} className="service-card-img" />
      <div className="service-card-details">
        <h3>{serviceName}</h3>
        <hr />
        <p>
          <strong>Company Name:</strong> {companyName}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <hr />
        <div className="service-card-actions">
          <button className="view-button" onClick={handleViewClick}>
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientServiceCard;
