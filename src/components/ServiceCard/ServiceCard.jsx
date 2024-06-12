import "./ServiceCard.css"; // Assuming you have some CSS for styling
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteService } from "../../feature/deleteServiceSlice";

import { fetchCompanyServices } from "../../feature/getCompanyServiceSlice";
import UpdateServiceForm from "../UpdateServiceForm/UpdateServiceForm";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ServiceCard = ({ service }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false); // to show the modal form
  const { id, serviceName, price, description, imageUrl } = service;

  // const authToken = useSelector((state) => state.auth.authToken);

  // const userId = useSelector((state) => state.auth.userId);
  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const dispatch = useDispatch();
  const notifySuccess = () =>
    toast.success("Service Deleted Successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  const handleDelete = async () => {
    try {
      await dispatch(deleteService({ serviceId: service.id, authToken }));

      notifySuccess();

      await dispatch(fetchCompanyServices({ userId: userId, authToken }));
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleClick = () => {
    setShowUpdateForm(true);
  };

  return (
    <div className="service-card service-card-width">
      <img
        src={service.imageUrl}
        alt={service.serviceName}
        className="service-card-img"
      />
      <div className="service-card-details">
        <h3>{service.serviceName}</h3>
        <hr style={{ borderColor: "black", borderWidth: "2px" }} />
        <p>
          <strong>Price:</strong> {service.price}
        </p>
        <p>
          <strong>Description:</strong> {service.description}
        </p>
        <hr style={{ borderColor: "black", borderWidth: "2px" }} />
        <div className="service-card-actions">
          <button className="update-button" onClick={handleClick}>
            Update
          </button>
          {showUpdateForm && (
            <UpdateServiceForm
              service={service}
              // update the state in the parent component (ServiceCard) to hide the modal form when the update operation is completed.
              onUpdate={() => {
                setShowUpdateForm(false);
              }}
            />
            // add the toast container into the parent of updateservice and service card ie services component
          )}

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
