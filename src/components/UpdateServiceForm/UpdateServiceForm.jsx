import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap"; // Assuming you're using React Bootstrap
import PropTypes from "prop-types";
import { updateServiceDetails } from "../../feature/updateServiceSlice";
import { useDispatch } from "react-redux";

import { fetchCompanyServices } from "../../feature/getCompanyServiceSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateServiceForm = ({ service, onUpdate }) => {
  const [updatedService, setUpdatedService] = useState(service);
  const dispatch = useDispatch();
  // const authToken = useSelector((state) => state.auth.authToken);

  // const userId = useSelector((state) => state.auth.userId);

  const authToken = sessionStorage.getItem("authToken");
  const userId = sessionStorage.getItem("userId");
  const notifySuccess = () =>
    toast.success("Service Updated successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedService({ ...updatedService, [name]: value });
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        updateServiceDetails({
          serviceId: service.id,
          authToken: authToken,
          updatedServiceData: updatedService,
        })
      );
      notifySuccess();

      await dispatch(fetchCompanyServices({ userId, authToken }));
      onUpdate();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const handleClose = () => {
    onUpdate();
  };

  return (
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

          <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

UpdateServiceForm.propTypes = {
  service: PropTypes.object.isRequired, // Validate 'service' prop as an object and required
  onUpdate: PropTypes.func.isRequired, // Validate 'onUpdate' prop as a function and required
};
export default UpdateServiceForm;
