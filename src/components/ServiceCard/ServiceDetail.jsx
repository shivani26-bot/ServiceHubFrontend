import React from "react";
import { Row, Col, Card } from "react-bootstrap";

const ServiceDetail = ({ service }) => {
  const { imageUrl, serviceName, price, description, companyName } = service;

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
          <strong>Company Name:</strong> {service.companyName}
        </p>
        <p>
          <strong>Price:</strong> {service.price}
        </p>
        <p>
          <strong>Description:</strong> {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceDetail;
