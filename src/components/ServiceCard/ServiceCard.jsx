import React from "react";
import "./ServiceCard.css"; // Assuming you have some CSS for styling
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { deleteService } from "../../feature/deleteServiceSlice";
import { useSelector } from "react-redux";
import { fetchCompanyServices } from "../../feature/getCompanyServiceSlice";
import UpdateServiceForm from "../UpdateServiceForm/UpdateServiceForm";
// import { fetchServiceDetails } from "../../feature/updateServiceSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ServiceCard = ({ service }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false); // to show the modal form
  const { id, serviceName, price, description, imageUrl } = service;
  console.log("service", service);
  console.log("id", id);
  const authToken = useSelector((state) => state.auth.authToken);
  console.log("authToken", authToken);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  // const notifySuccess = (msg) =>
  //   toast.success(msg, {
  //     position: "top-right",
  //     autoClose: 1000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  const handleDelete = async () => {
    try {
      const response = await dispatch(
        deleteService({ serviceId: service.id, authToken })
      );
      if (response) alert("Service Deleted Successfully");
      // notifySuccess("Service Deleted successfully!");

      // After successful deletion, fetch the updated list of services
      await dispatch(fetchCompanyServices({ userId: userId, authToken }));
    } catch (error) {
      // Handle any errors if necessary
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
        <hr />
        <p>
          <strong>Price:</strong> {service.price}
        </p>
        <p>
          <strong>Description:</strong> {service.description}
        </p>
        <hr />
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
          )}
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
          {/* <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          /> */}
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
