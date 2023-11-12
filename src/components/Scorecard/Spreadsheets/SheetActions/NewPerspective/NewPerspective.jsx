import React, { useState } from 'react';
import "./NewPerspective.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import { useContext } from 'react';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import axios from 'axios';
import { rootUrl } from '../../../../../Constants';


const NewPerspective = ({addPer,setAddPer}) => {
    const {getDefaultPerspective}=useContext(SpreadsheetContext);
    const [perspective, setPerspective] = useState({
        name: "",
        description: "",
        question:""
      });
      const [validated, setValidated] = useState(false);
      const [show, setShow] = useState(false);
      const toggleShow = () => setShow(false);

      const handlePerspective=async(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
          setValidated(true);
        } 
        else
        {
            await axios
            .post(`${rootUrl}/ObjectiveServlet?action=create_perspective`, {
                company_id: 1,
                analysis_type: 4,
                name: perspective.name.toLowerCase(),
                description: perspective.description,
                question:perspective.question,
                color: "lightbrown",
                display_name: perspective.name,
                username: "amaiello"
            })
            .then(function (response) {
              getDefaultPerspective()
              setShow(true);
              setAddPer(false);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
      const handleClose=()=>{
        setAddPer(false)
      }
  return (
    <>
    <Modal show={addPer} onHide={handleClose}>
      <Modal.Header closeButton>
        <div className="title">New Perspective</div>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handlePerspective}>
        <Form.Group
          className="my-3 mx-3"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label className="labelFont">Perspective Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Example Perspective name"
            onChange={(e) =>
              setPerspective((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <Form.Control.Feedback type="invalid">
            Perspective name cannot be empty.
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
              setPerspective((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Form.Group>
        <Form.Group
        className="my-3 mx-3"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Label className="labelFont">Question</Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          onChange={(e) =>
            setPerspective((prev) => ({ ...prev, question: e.target.value }))
          }
        />
      </Form.Group>
        <Modal.Footer>
          <button className="cancelBtn" onClick={handleClose}>
            Cancel
          </button>
          <Button className="saveBtn" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
    <ToastContainer position="top-center">
      <Toast
        show={show}
        onClose={toggleShow}
        autohide={true}
        delay={3000}
        bg={"success"}
      >
        <Toast.Body className="success-text">
          Perspective created successfully!.
        </Toast.Body>
      </Toast>
    </ToastContainer>
  </>
  )
}

export default NewPerspective;