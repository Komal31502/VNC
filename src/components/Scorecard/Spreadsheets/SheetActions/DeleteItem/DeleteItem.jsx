import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import "./DeleteItem.css";
import { SpreadsheetContext } from "../../../../../context/SpreadsheetContext";
import { rootUrl } from "../../../../../Constants";

const DeleteItem = ({ del, setDelete }) => {

  const {  getDefaultPerspective, type,getSpreadsheetTable } = useContext(SpreadsheetContext);
 
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(false);
  const handleClose = () => { setDelete(false) };
  const handleDelete = async (item) => {
    if (item === "goal") {
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=obj`, {
          id: type.id,
        })
        .then((res) => {
          getSpreadsheetTable();
          handleClose();
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if (item === "kpi") {
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=kpi`, {
          id: type.id,
        })
        .then((res) => {
          getSpreadsheetTable();
          handleClose();
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else if (item === "perspective") {
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=perspective`, {
          company_id: 1,
          perspective_id: type.id
        })
        .then((res) => {
          getDefaultPerspective();
          handleClose();
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=action`, {
          ID: type.rowData.id,
        })
        .then((res) => {
          getSpreadsheetTable();
          handleClose();
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <Modal
        show={del}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <div className="title">Delete {type?.rowData?.title}</div>
        </Modal.Header>
        <Modal.Body>
          You are about to delete the {"    "} {type?.rowData?.title ? type.rowData?.title : type?.rowData?.name}
          {"    "} {type?.name} Please confirm.
        </Modal.Body>
        <Modal.Footer>
          <button className="cancelBtn" onClick={handleClose} >
            Close
          </button>
    
          <button
            className="confirmBtn"
      
            onClick={() => handleDelete(type?.name)}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-end">
        <Toast
          show={show}
          onClose={toggleShow}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Deleted successfully!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}

export default DeleteItem;