import { useNavigate } from "react-router-dom";
import "./ServiceCard";
const ClientServiceCard = ({ service }) => {
  const { id, serviceName, price, description, imageUrl, companyName } =
    service;
  const navigate = useNavigate();

  const handleViewClick = () => {
    // Navigate to /client/viewAd
    navigate(`/client/viewAd/${id}`);
  };
  return (
    <div className="service-card service-card-width">
      <img src={imageUrl} alt={serviceName} className="service-card-img" />
      <div className="service-card-details">
        <h3>{serviceName}</h3>
        <hr style={{ borderColor: "black", borderWidth: "2px" }} />
        <p>
          <strong>Company Name:</strong> {companyName}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <p>
          <strong>Description:</strong> {description}
        </p>
        <hr style={{ borderColor: "black", borderWidth: "2px" }} />
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
