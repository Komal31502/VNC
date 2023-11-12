import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import "./DeletePopup.css";
import axios from "axios";
import { Toast, ToastContainer } from "react-bootstrap";
import { ScorecardContext } from "../../context/ScorecardContext";
import { rootUrl } from "../../Constants";

const DeletePopup = ({
  delGrp,
  setDelGrp,
  delScore,
  setDelScore,
  groupData,
  scorecardData,
}) => {
  const { postHistory } = useContext(ScorecardContext);
  const [toastShow, setToastShow] = useState({
    score:false,
    group:false
  })
  const[toastErrorShow, setToastErrorShow] = useState({
    score:false,
    group:false
  })
  const toastClose = () => {
    toastShow.group? setToastShow((prev) => ({...prev,group:false })) : setToastShow((prev) => ({...prev,score:false}))
  }
  const toastErrorClose = () => {
    toastErrorShow.group ? setToastErrorShow((prev) => ({...prev, group:false})) : setToastErrorShow((prev) => ({...prev, score:false}))
  }
  const handleClose = () => (delGrp ? setDelGrp(false) : setDelScore(false));
  const DeleteGroup = async () => {
    await axios
      .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=group`, {
        id: groupData.id,
      })
      .then((res) => {
        postHistory({
          date_recorded: new Date().getTime(),
          date_updated: new Date().getTime(),
          user_id: "amaiello",
          transaction_type: "delete",
          object_type: "group",
          description: `${groupData.name} group was deleted`,
          status: "New",
          object_id: res.data.data[0].deleted_group_id,
          project_id: res.data.data[0].deleted_group_id
        }
        )
        handleClose();      
        setToastShow((prev) => ({...prev, group:delGrp? true : ""}))
      })
      .catch((err) => {
        console.log(err);
        handleClose();
        setToastErrorShow((prev) => ({...prev, group: delGrp? true: "" }))
      });
  };
  const DeleteScore = async () => {
    await axios
      .post(`${rootUrl}/ObjectiveServlet?action=remove&arg=project`, {
        id: scorecardData?.id,
      })
      .then((res) => {
        handleClose();
        postHistory({
          date_recorded: new Date().getTime(),
          date_updated: new Date().getTime(),
          user_id: "amaiello",
          transaction_type: "delete",
          object_type: "scorecard",
          description: `${scorecardData?.name} scorecard was deleted`,
          status: "New",
          object_id: res.data.data[0].deleted_scorecard_id,
          project_id: res.data.data[0].deleted_scorecard_id
        }
        )
        handleClose();      
        setToastShow((prev) => ({...prev, score:delScore? true : ""}))
        
      })
      .catch((err) => {
        console.log(err);
        handleClose();
        setToastErrorShow((prev) => ({...prev, score: delScore? true: "" }))
      });
  };
  return (
    <>
      <Modal
        show={delGrp ? delGrp : delScore ? delScore : false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          {!delGrp ? (
            <div className="title">Delete Scorecard</div>
          ) : (
            <div className="title">Delete Group</div>
          )}
       </Modal.Header>         
        <Modal.Body>
          You are about to delete the{" "}
          {delGrp ? groupData.name : scorecardData?.name}. Please confirm
        </Modal.Body>
        <Modal.Footer>
          <button className="cancelBtn" onClick={handleClose}>
            Close
          </button>
          <button
            className="confirmBtn"
            onClick={() => {
              if (delGrp) {
                DeleteGroup();
              } else {
                DeleteScore();
              }
            }}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center">
      <Toast
          show={toastShow.group}
          onClose={toastClose}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            {groupData?.name } Group deleted successfully!
          </Toast.Body>
        </Toast>
        <Toast
          show={toastErrorShow.group}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          {groupData?.name} Group deletion failed!
          </Toast.Body>
        </Toast>
        <Toast
          show={toastShow.score}
          onClose={toastClose}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
          {scorecardData?.name} Scorecard deleted successfully!
          </Toast.Body>
        </Toast>
        <Toast
          show={toastErrorShow.score}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          {scorecardData?.name} deletion failed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default DeletePopup;
