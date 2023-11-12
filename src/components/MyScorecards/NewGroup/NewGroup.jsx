import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./NewGroup.css";
import axios from "axios";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { ScorecardContext } from "../../../context/ScorecardContext";
import { rootUrl } from "../../../Constants";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const NewGroup = ({ disGroup, setDisGroup }) => {
  const { postHistory, assets } = useContext(ScorecardContext);
  const [validated, setValidated] = useState(false);
  const [toastShow, setToastShow] = useState(false)
  const [toastErrorShow, setToastErrorShow] = useState(false)
  const[errorMessage, setErrorMessage] = useState(false)
  const toastClose = () => {
    setToastShow(!toastShow)  
  }
  const toastErrorClose = () => {
    setToastErrorShow(!toastErrorShow)
  }
  const [group, setGroup] = useState({
    name: "",
    description: "",
  });
  const isGroupNameExist = (name) => {
    return assets.groups.some((item) => item?.name?.toLowerCase() === name?.toLowerCase())
  }
  const handleClose = () => {
    setDisGroup(false);
    setValidated(false);
    setErrorMessage(false)
  };

  const handleGroup = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if(isGroupNameExist(group?.name)){
        setErrorMessage(true)
      }
      else{
        await axios
        .post(`${rootUrl}/ObjectiveServlet?action=create&arg=group`, {
          name: group.name,
          description: group.description,
          user_id: "2",
          company_id: "1",
          type: "NULL",
          tier: "1",
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "create",
            object_type: "group",
            description: `${group.name} group was created`,
            status: "New",
            object_id: response.data.data[0].id,
            project_id: response.data.data[0].id
          }
          )
          setDisGroup(false);
          setToastShow(true)
          
        })
        .catch(function (error) {
          console.log(error);
          setDisGroup(false);
          setToastErrorShow(true)
          

        });

      }
     
    }
  };
  return (
    <>
      <Modal show={disGroup} onHide={handleClose}>
        <Modal.Header closeButton>
          <div className="title">New Group</div>
        </Modal.Header>

        <Form noValidate validated={validated} onSubmit={handleGroup}>
          <Form.Group
            className="my-3 mx-3"
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className="labelFont">Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Example group name"
              onChange={(e) =>{
                setGroup((prev) => ({ ...prev, name: e.target.value }))
                isGroupNameExist(e.target.value)
                setErrorMessage("");
              }                
              }
              required
            />
            {errorMessage && (
                <>
                <Stack sx={{ width: '100%', marginTop: "4px" }} spacing={2}>
                   <Alert severity="error">The Name already exists in database!</Alert>
             </Stack>           
                </>
                
              )}
            <Form.Control.Feedback type="invalid">
              Group name cannot be empty.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="my-3 mx-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label className="labelFont">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              onChange={(e) =>
                setGroup((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </Form.Group>
          <Modal.Footer>
            <Button className="cancelBtn" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="saveBtn" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ToastContainer position="top-center">
      <Toast
          show={toastShow}
          onClose={toastClose}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
          Group created successfully!
          </Toast.Body>
        </Toast>
        <Toast
          show={toastErrorShow}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          Group creation failed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default NewGroup;
