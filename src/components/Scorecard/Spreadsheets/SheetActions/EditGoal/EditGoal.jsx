import React, { useContext, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Toast, ToastContainer } from "react-bootstrap";
import axios from "axios"
import './EditGoal.css'
import Comments from "../Comments/Comments"
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext'
import { rootUrl } from '../../../../../Constants';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const EditGoal = ({ EditGoalShow, handleEditGoalHide }) => {
  const [toastShow, setToastShow] = useState(false)
  const [toastErrorShow, setToastErrorShow] = useState(false)
  const[errorMessage, setErrorMessage] = useState(false)
  const toggleToast = () => {
    setToastShow(!toggleToast)
  }
  const toastErrorClose = () => {
    setToastErrorShow(!toastErrorShow)
  }
  const {perspectives, themeData, getSpreadsheetTable,goals,setGoals,tableData,type} = useContext(SpreadsheetContext);
  const isGoalNameExist = (name) => {
    return goals?.some((item) => item?.title?.toLowerCase() === name?.toLowerCase())
  }
  const [goal, setGoal] = useState({
  })
  async function handleEditGoal(event) {
    event.preventDefault();
    if(isGoalNameExist(goal?.title)){
      setErrorMessage(true)
    }else{
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=obj`,{
        ...type?.rowData,...goal
      })
        .then(function (response) {
            getSpreadsheetTable();
            handleEditGoalHide();
            setToastShow(true)       
        })
        .catch(function (error) {
          handleEditGoalHide();
          setToastErrorShow(true);
          console.log(error)
        })
    }
     
  }

  function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
 

  return (
    <>
    <Modal show={EditGoalShow} onHide={handleEditGoalHide} fullscreen={true}>
      <Modal.Header closeButton>
        <div className='new-header' >
          <img className='kpi-header' alt="" src="/images/scorecard/spreadsheets/table-actions/goal.svg" />
          <div>Edit Goal</div>
        </div>
      </Modal.Header>
      <div className='actions-body'>
        <div className='upper-part'>
          <div className='left-section'>
            <Form onSubmit={handleEditGoal} >
              <Form.Group className="mb-3 " controlId="formPlaintextPassword">
                <Form.Label >
                  Scorecard
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={tableData?.name}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>
                  Perspective
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={perspectives.filter((per) => per.display_name.toLowerCase() === type?.rowData?.row)[0]?.display_name}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3 " controlId="formPlaintextPassword">
                <Form.Label>
                  Goal Name
                </Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={type?.rowData?.title}
                  onChange={(e) => {setGoal((prev) => ({ ...prev, title: e.target.value }));
                  isGoalNameExist(e.target.value)
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

              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <Form.Label>
                  Description
                </Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={type?.rowData?.description}
                  onChange={(event) => {
                    setGoal((prev) => ({ ...prev, description: event.target.value }))
                  }}
                />
              </Form.Group>

              <Row className='mb-3'>
                <Col sm="2">Owners(s)</Col>
                <Col sm="10">
                  <div className='avatar-container'>
                    <div className='avatar-div'>
                      <img alt="" src="/images/myscorecards/members/avatar1.svg" />
                    </div>
                    <div className='avatar-div'>
                      <img alt="" src="/images/myscorecards/members/avatar5.svg" />
                    </div>
                    <div className='avatar-div'>
                      <img alt="" src="/images/myscorecards/members/avatar4.svg" />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col sm="6">
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      Start Date
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="date"  disabled />
                    </Col>
                  </Form.Group>
                </Col>
                <Col sm="6">
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      End Date
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Control type="date" disabled />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Strategic Theme
                </Form.Label>
                <Col sm="10">
                  <Form.Select aria-label="Default select example" className='kpi-dropdowns'
                    onChange={(event) => {
                      setGoal((prev) => ({ ...prev, theme: event.target.value }))
                    }}
                  >
                    {
                      themeData.map((theme) => {
                        return (
                          <option value={theme.title}>{theme.title}</option>
                        )
                      })
                    }

                  </Form.Select>
                </Col>
              </Form.Group>
              <Row className='mb-3'>
                <Col sm="6">
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      Budget
                    </Form.Label>
                    <Col sm={8}>
                      <InputGroup >
                        <Form.Select aria-label="Default select example" disabled>
                          <option value="1">USD</option>
                          <option value="2">Euro</option>
                          <option value="3">CAD</option>
                        </Form.Select>
                        <Form.Control
                          placeholder="$100"
                          aria-label="$100"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>

                  </Form.Group>
                </Col>
                <Col sm="6">
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={4}>
                      Actuals
                    </Form.Label>
                    <Col sm={8}>
                      <InputGroup >
                        <Form.Select aria-label="Default select example" disabled>
                          <option value="1">USD</option>
                          <option value="2">Euro</option>
                          <option value="3">CAD</option>
                        </Form.Select>
                        <Form.Control
                          placeholder="$100"
                          aria-label="$100"
                          aria-describedby="basic-addon1"
                          disabled
                        />
                      </InputGroup>
                    </Col>

                  </Form.Group>
                </Col>
              </Row>
              <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                  Attatchment
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="file" />
                </Col>
              </Form.Group>


              <img alt="" src="/images/scorecard/spreadsheets/sidebar/line(Stroke).svg" />
              <Comments isTextBox={true}  />

              <Modal.Footer>
                <Button className='cancelBtn' variant="secondary" onClick={handleEditGoalHide}>
                  Close
                </Button>
                <Button className='saveBtn' variant="primary" type="submit" >
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          </div>

        </div>
      </div>
    </Modal>
    <ToastContainer position="top-center">
      <Toast
          show={toastShow}
          onClose={toggleToast}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
          {type?.rowData?.title} Goal Updated Successfully!.
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
          {type?.rowData?.title} Goal Update Failed!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
     </>
  )
}
export default EditGoal;