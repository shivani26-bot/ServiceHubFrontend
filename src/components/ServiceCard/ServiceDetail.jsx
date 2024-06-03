import PropTypes from "prop-types";
const ServiceDetail = ({ service }) => {
  const { imageUrl, serviceName, price, description, companyName } = service;

  return (
    <div className="service">
      <img
        src={service.imageUrl}
        alt={service.serviceName}
        className="service-card-img"
      />
      <div className="service-card-details ">
        <h3>{service.serviceName}</h3>
        <hr style={{ borderColor: "black", borderWidth: "2px" }} />
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

ServiceDetail.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imageUrl: PropTypes.string,
    serviceName: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
  }).isRequired,
};
export default ServiceDetail;
