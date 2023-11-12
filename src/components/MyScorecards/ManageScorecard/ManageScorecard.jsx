import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';
import "./ManageScorecard.css";
import { ScorecardContext } from '../../../context/ScorecardContext';
import axios from 'axios';
import { Button, Col, Toast, ToastContainer } from "react-bootstrap";
import { rootUrl } from '../../../Constants';


const ManageScorecard = ({ manage, setManage, scorecardData }) => {
  const { assets, postHistory } = useContext(ScorecardContext);
  const [group, setGroup] = useState(null);
  const [copies, setCopies] = useState(0);
  const initialErrorState={   group:false,
    copy:false};
  const [show, setShow] = useState({
    move: false,
    copy: false
  });
  const [status,setStatus]=useState({
    copy:false,
    move:false
  })
  const [error, setError] = useState(initialErrorState);
  const handleClose = () => setManage(false);
  const toggleShow = () => show.move ? setShow((prev) => ({ ...prev, move: false })) : setShow((prev) => ({ ...prev, copy: false }));
  const handleMoveScorecard = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();
      await axios
      .post(`${rootUrl}/ObjectiveServlet?action=move_scorecard`, {
        scorecard_id: scorecardData.id,
        group_id: group
      })
      .then(function (response) {
        setShow((prev) => ({ ...prev, move: true }));
        setError(initialErrorState);
        setManage(false);
        postHistory({
          date_recorded: new Date().getTime(),
          date_updated: new Date().getTime(),
          user_id: "amaiello",
          transaction_type: "move",
          object_type: "scorecard",
          description: `${scorecardData?.name} scorecard moved to group ${group}`,
          status: "New",
          object_id: scorecardData?.id,
          project_id: scorecardData?.id
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else
    {
      e.preventDefault();
      setError((prev)=> ({...prev,copy:true}));
    }

  }
  const handleCopyScorecard = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === true) {
      e.preventDefault();

      if (copies < 2) {
        await axios
          .post(`${rootUrl}/ObjectiveServlet?action=copy_scorecard`, {
            scorecard_id: scorecardData.id,
            new_group_id: group,
            user_name: "amaiello"
          })
          .then(function (response) {
            setShow((prev) => ({ ...prev, copy: true }));
            setError(initialErrorState);
            postHistory({
              date_recorded: new Date().getTime(),
              date_updated: new Date().getTime(),
              user_id: "amaiello",
              transaction_type: "move",
              object_type: "scorecard",
              description: `${scorecardData?.name} scorecard copied to group ${group}`,
              status: "New",
              object_id: scorecardData?.id,
              project_id: scorecardData?.id
            })
            setManage(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
        await axios
          .post(`${rootUrl}/ObjectiveServlet?action=copy_multiple_scorecards&arg=${copies}`, {
            scorecard_id: scorecardData.id,
            new_group_id: group,
            user_name: "amaiello"
          })
          .then(function (response) {
            setShow((prev) => ({ ...prev, copy: true }));
            setError(initialErrorState);
            postHistory({
              date_recorded: new Date().getTime(),
              date_updated: new Date().getTime(),
              user_id: "amaiello",
              transaction_type: "move",
              object_type: "scorecard",
              description: `${scorecardData?.name} scorecard copied to group ${group}`,
              status: "New",
              object_id: scorecardData?.id,
              project_id: scorecardData?.id
            })
            setManage(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    else
    {
      e.preventDefault();
      setError((prev)=> ({...prev,copy:true}));
    }
  }
  return (
    <Modal show={manage} onHide={handleClose}>
      <Modal.Header closeButton>
        <div className="title">Manage</div>
      </Modal.Header>
    
        <Form noValidate   onSubmit={(status.copy)?handleCopyScorecard:handleMoveScorecard}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='labelFont'>Source</Form.Label>
            <Form.Control type="text" placeholder="Example group name" value={assets?.groups?.filter((grp) => grp.scorecards.some((scr) => scr.id === scorecardData.id))[0]?.name} readOnly />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="labelFont">Destination</Form.Label>
            <Form.Select aria-label="Default select example"  
            onChange={(e) => { 
              setError((prev)=> ({...prev,group:false}));
              if(e.target.value!=='Select Destination Group')
              setGroup(e.target.value); 
              else
              setError((prev)=> ({...prev,group:true}));
            }} isInvalid={error.group} required>
              <option value={null}>Select Destination Group</option>
              {

                assets?.groups.filter((grp) => !grp.scorecards.some((scr) => scr.id === scorecardData.id))?.map((temp, index) => {
                  return (
                    <option key={index} value={temp.id}>
                      {temp.name}
                    </option>
                  )
                })
              }
            </Form.Select>
            <Form.Control.Feedback type="invalid">
            Please select one destination group.
           </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='labelFont'>#Copies (if applicable)</Form.Label>
            <Col sm="5">
              <Form.Control type="number" min={1} step={1} defaultValue={1} pattern="[0-9]" isInvalid={error.copy}  onChange={(e) => 
                {
                  setError((prev)=> ({...prev,copy:false}));
                  if(e.target.value)
                  {
                    setCopies(e.target.value)
                  }
                }
              
           
              } />
              <Form.Control.Feedback type="invalid">
       Decimal values are not allowed.
      </Form.Control.Feedback>
            </Col>
          </Form.Group>
          </Modal.Body>
        <Modal.Footer>
        <Button className='cancelBtn' onClick={handleClose}>
          Cancel
        </Button>
        <Button className='saveBtn' type="submit" disabled={group===null ||error.group} onClick={()=>setStatus((prev) => ({ ...prev,move: true,copy:false}))}>

          <span style={{ marginRight: "5px" }}><img src="/images/myscorecards/newscorecard/Move.svg" alt="" /></span>
          Move
        </Button>
        <Button className='saveBtn' type="submit" disabled={group===null ||error.group || error.copy} onClick={()=>setStatus((prev) => ({ ...prev,copy:true,move:false}))}>
          <span style={{ marginRight: "5px" }}>
            <img src="/images/myscorecards/newscorecard/Copy.svg" alt="" />
          </span>
          Copy
        </Button>
        </Modal.Footer>
        </Form>
    
      <ToastContainer position="top-center">
        <Toast
          show={show.move}
          onClose={toggleShow}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Moved {scorecardData?.name} successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={show.copy}
          onClose={toggleShow}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Copied {scorecardData?.name} successfully!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Modal>
  )
}

export default ManageScorecard;