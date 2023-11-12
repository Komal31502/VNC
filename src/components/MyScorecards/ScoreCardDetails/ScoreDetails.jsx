import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./ScoreCardDetails.css";
import { scorecardVisbility } from "../../../utils/newscorecard";
import axios from "axios";
import {Toast, ToastContainer } from "react-bootstrap";
import { ScorecardContext } from "../../../context/ScorecardContext";
import { rootUrl } from "../../../Constants";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ScoreDetails = ({
  grpDetails,
  setGrpDetails,
  scoreDetails,
  setScoreDetails,
  groupData,
  scorecardData,
}) => {
  const { postHistory,scorecards, assets} = useContext(ScorecardContext);
  const[errorMessage, setErrorMessage] = useState({
    group:false,
    score:false
  })
  const [details, setDetails] = useState({ name: "", description: "" });
  const isGroupNameExist = (name) => {
    return assets?.groups?.some((item) => item.name.toLowerCase() === name.toLowerCase())
  }
  const isScoreNameExist = (name) => {
    return scorecards.some((scorecard) => scorecard?.name?.toLowerCase() === name.toLowerCase());
  };
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

  const [visible, setVisible] = useState("private");
  const handleClose = () => {
    if (grpDetails) {
      setGrpDetails(false);
      setErrorMessage((prev) => ({...prev, group:false}))
      
    }
    else{
      setScoreDetails(false);
      setErrorMessage((prev) => ({...prev, score:false}))
    } 
  };
  async function handleGroup(event) {
    event.preventDefault();
    if(isGroupNameExist(details?.name)){
      setErrorMessage((prev) => ({...prev, group:true}))
    }else{
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=group&arg1=amaiello`, {
        name: details.name ? details.name : groupData.name,
        description: details.description
          ? details.description
          : '',
        user_id: "2",
        company_id: "1",
        type: "NULL",
        tier: "1",
        id: groupData.id
      })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "update",
            object_type: "group",
            description: `${details.name ? details.name : groupData.name} group was updated`,
            status: "New",
            object_id: groupData.id,
            project_id: groupData.id,
          }
          )
          setGrpDetails(false);
          setToastShow((prev) => ({...prev, group:grpDetails? true : ""}))
        })
        .catch(function (error) {
          console.log(error);
          setGrpDetails(false);
          setToastErrorShow((prev) => ({...prev, group: grpDetails? true: "" }))
          
        });
    }   
  }
  async function handleScorecard(event) {
    event.preventDefault();
    if(isScoreNameExist(details?.name)){
      setErrorMessage((prev) => ({...prev, score:true}))
    }else{
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=project`, {
        name: details.name ? details.name : scorecardData?.name,
        description: details?.description ? details?.description : scorecardData?.description,
        theme_id: "NULL",
        created_by: "amaiello",
        created_date: scorecards?.filter((scr)=>scr.id===scorecardData.id)[0]?.created_date,
        type: scorecards?.filter((scr)=>scr.id===scorecardData.id)[0]?.internal_type,
        id: scorecardData.id,
        visibility: visible,
        hypothesis: "ask and ye shall receive",
        group_id: scorecards?.filter((scr)=>scr.id===scorecardData.id)[0]?.group_id,
        internal_type: scorecards?.filter((scr)=>scr.id===scorecardData.id)[0]?.internal_type
      })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "update",
            object_type: "scorecard",
            description: `${details.name ? details.name : scorecardData?.name} scorecard was updated`,
            status: "New",
            object_id: scorecardData.id,
            project_id: scorecardData.id
          }
          )
          setScoreDetails(false);
          setToastShow((prev) => ({...prev, score: scoreDetails? true: "" }))
        })
        .catch(function (error) {
          console.log(error);
          setToastErrorShow((prev) => ({...prev, score: scoreDetails? true: "" }))
          setScoreDetails(false);
        });
    }
  
  }
  return (
    <>
        <Modal
      show={grpDetails ? grpDetails : scoreDetails ? scoreDetails : false}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <div className="title">
          {grpDetails ? "Group Details" : "Scorecard Details"}
        </div>
      </Modal.Header>
      <Form onSubmit={grpDetails ? handleGroup : handleScorecard}>
        <Form.Group className="my-3 mx-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="labelFont">
            {grpDetails ? "Group Name" : "Scorecard name"}
          </Form.Label>
          <Form.Control
            type="text"
            defaultValue={grpDetails ? groupData?.name : scorecardData?.name}
            onChange={(e) =>{
              setDetails((prev) => ({ ...prev, name: e.target.value }))
              grpDetails? isGroupNameExist(e.target.value) : isScoreNameExist(e.target.value)
              grpDetails?  setErrorMessage((prev) => ({...prev, group:false})) :  setErrorMessage((prev) => ({...prev, score:false}))
             
            }            
            }
          />
          {(errorMessage.group || errorMessage.score) && (          
            <>
            <Stack sx={{ width: '100%', marginTop: "4px" }} spacing={2}>
                   <Alert severity="error">The Name already exists in database!</Alert>
             </Stack> 
            </>
          )}
        </Form.Group>
        <Form.Group
          className="my-3 mx-3"
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label className="labelFont">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={1}
            defaultValue={
              grpDetails ? groupData?.description : scorecardData?.description
            }
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </Form.Group>
        {
          !grpDetails ?
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="my-3 mx-3"
            >
              <Form.Label className="labelFont">Visibility</Form.Label>
              <Form.Select
                aria-label="Default select example"
                defaultValue={
                  grpDetails ? groupData?.visibility : scorecardData?.visibility
                }
                onChange={(e) => setVisible(e.target.value)}
              >
                {scorecardVisbility.map((temp, index) => {
                  return <option key={index} value={temp.value}>{temp.label}</option>;
                })}
              </Form.Select>
            </Form.Group> :
            <></>
        }

        <Modal.Footer>
          <button className="cancelBtn" onClick={handleClose}>
            Cancel
          </button>
          <button className="saveBtn" type="submit">
            Save
          </button>
        </Modal.Footer>
      </Form>
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
          {groupData?.name}  Group updated successfully!
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
          {groupData?.name} Group updation failed!
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
          {scorecardData?.name} Scorecard updated successfully!
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
         {scorecardData?.name}  Scorecard updation failed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  
  );
};

export default ScoreDetails;
