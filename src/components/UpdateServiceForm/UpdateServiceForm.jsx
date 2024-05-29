import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming you're using React Bootstrap
import PropTypes from "prop-types";
import { updateServiceDetails } from "../../feature/updateServiceSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchCompanyServices } from "../../feature/getCompanyServiceSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const UpdateServiceForm = ({ service, onUpdate }) => {
  const [updatedService, setUpdatedService] = useState(service);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.authToken);
  console.log("authToken1", authToken);
  const userId = useSelector((state) => state.auth.userId);
  console.log("userId1", userId);
  // const notifySuccess = () =>
  //   toast.success("Service Updated successfully!", {
  //     position: "top-right",
  //     autoClose: 3000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService({ ...updatedService, [name]: value });
  };
  console.log("updatedService", updatedService);
  const handleUpdateClick = async (e) => {
    e.preventDefault();
    // console.log(service.id, authToken);

    try {
      const response = await dispatch(
        updateServiceDetails({
          serviceId: service.id,
          authToken: authToken,
          updatedServiceData: updatedService,
        })
      );
      // notifySuccess();
      if (response) {
        // notifySuccess();
        alert("Service Updated Successfully");
      }

      // console.log("response", response);
      // await dispatch(fetchCompanyServices({ userId, authToken }));
      // onUpdate();
      await dispatch(fetchCompanyServices({ userId, authToken }));

      onUpdate();
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error deleting service:", error);
    }
  };

  const handleClose = () => {
    onUpdate();
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateClick}>
            <Form.Group controlId="serviceName">
              <Form.Label>Service Name</Form.Label>
              <Form.Control
                type="text"
                name="serviceName"
                value={updatedService.serviceName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={updatedService.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updatedService.price}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Add similar Form.Group components for other fields */}
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "20px" }}
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
    </>
  );
};

UpdateServiceForm.propTypes = {
  service: PropTypes.object.isRequired, // Validate 'service' prop as an object and required
  onUpdate: PropTypes.func.isRequired, // Validate 'onUpdate' prop as a function and required
};
export default UpdateServiceForm;
