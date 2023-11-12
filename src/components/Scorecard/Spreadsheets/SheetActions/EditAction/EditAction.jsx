import React, { useContext, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Toast, ToastContainer } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import './EditAction.css'
import Comments from "../Comments/Comments"
import axios from 'axios';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { rootUrl } from '../../../../../Constants';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const EditAction = ({ EditActionShow, handleEditActionHide}) => {
 
  const { tasks, tableData, getSpreadsheetTable,type, actions} = useContext(SpreadsheetContext);
  
  const [toastShow, setToastShow] = useState(false)
  const [toastErrorShow, setToastErrorShow] = useState(false)
  const toggleToast = () => {
    setToastShow(!toggleToast)
  }
  const toastErrorClose = () => {
    setToastErrorShow(!toastErrorShow)
  }

  const [action, setAction] = useState({})
  const handleAction = async (e) => {

    e.preventDefault();
    await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=task&arg1=${type?.rowData?.oid}`,
      {
        ID: type?.id,
        owner: type?.rowData.created_by,
        title: action.title ? action.title : type?.rowData.title,
        description: action.description ? action.description : type?.rowData.description,
        percent_complete: type?.rowData.percent_complete,
        type: action.type ? action.type : type?.rowData.type,
        status: action.status ? action.status : type?.rowData.status,
        timeline: type?.rowData.timeline,
        budget: action.budget ? action.budget : type?.rowData.budget,
        date_complete: action.scheduled_completion ? action.scheduled_completion : type?.rowData.actual_end_date,
        scheduled_completion: action.scheduled_completion ? action.scheduled_completion : type?.rowData.actual_end_date,
        actual_start_date: action.actual_start_date ? action.actual_start_date : type?.rowData.actual_start_date,
        planned_start_date: action.actual_start_date ? action.actual_start_date : type?.rowData.planned_start_date,
        planned_end_date: action.scheduled_completion ? action.scheduled_completion : type?.rowData.planned_end_date,
        quant_weight: type?.rowData.quant_weight,
        qual_weight: type?.rowData.qual_weight,
        forecast_date: type?.rowData.forecast_date
      }
    )
      .then((res) => {
        getSpreadsheetTable();
        handleEditActionHide();
        setToastShow(true)
        setToastShow(true)
      })
      .catch((error) => {
        handleEditActionHide();
        setToastErrorShow(true);
        console.log(error)
      })

  }
  return (
  
    <>
    <Modal show={EditActionShow} onHide={handleEditActionHide} dialogClassName={"modal-kpi"} size="lg">
      <Modal.Header closeButton>
        <div className='new-header' >
          <div className='kpi-header'><img className='kpi-header' alt="" src="/images/scorecard/spreadsheets/table-actions/edit-action-header.svg" /></div>
          <div>Edit Action</div>
        </div>
      </Modal.Header>
      <Form onSubmit={handleAction}>
        <div className='actions-body'>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" style={{ width: "100%" }}>
            <Form.Label column sm="3">
              Scorecard
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                defaultValue={tableData?.name}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword" style={{ width: "100%" }}>
            <Form.Label column sm="3">
              Goal Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                defaultValue={type?.rowData?.oname}
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword" style={{ width: "100%" }}>
            <Form.Label column sm="3">
              Action Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                defaultValue={type?.rowData?.title}
                onChange={(e) => setAction((prev) => ({ ...prev, title: e.target.value }))}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" style={{ width: "100%" }}>
            <Form.Label column sm="3">
              Description
            </Form.Label>
            <Col sm="9">
              <Form.Control as="textarea" rows={3} defaultValue={type?.rowData?.description}
                onChange={(e) => setAction((prev) => ({ ...prev, description: e.target.value }))} />
            </Col>
          </Form.Group>
          <Row className='mb-3' style={{ width: "100%" }}>
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
          <Row className='mb-3' style={{ width: "100%" }}>
            <Col sm="6">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                  Start Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="date" onChange={(e) => {
                    const selectedDate = e.target.value;
                    const dateObject = new Date(selectedDate)
                    const unixTimeStamp = dateObject.getTime()
                    setAction((prev) => ({ ...prev, actual_start_date: unixTimeStamp }))
                  }

                  } />
                </Col>
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                  End Date
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type="date" onChange={(e) => {
                    const selectedDate = e.target.value;
                    const dateObject = new Date(selectedDate)
                    const unixTimeStamp = dateObject.getTime()
                    setAction((prev) => ({ ...prev, scheduled_completion: unixTimeStamp }))
                  }

                  } />
                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3' style={{ width: "100%" }}>
            <Col sm="6">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                  Action Type
                </Form.Label>
                <Col sm={8}>
                  <Form.Select aria-label="Default select example" className='dropdown-style'
                    onChange={(event) => { setAction((prev) => ({ ...prev, type: event.target.value })); }}
                    defaultValue={type?.rowData?.type}
                    required
                  >
                    {
                      tasks?.filter((per) => per.name !== "KPI").map((pers, index) => {
                        return (
                          <option key={index} value={pers.name}>{pers.name}</option>
                        )
                      })
                    }
                  </Form.Select>
                </Col>
              </Form.Group>
            </Col>
            <Col sm="6">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                  Status
                </Form.Label>
                <Col sm={8}>
                  <Form.Control type='text' className='kpi-dropdowns'
                    onChange={(event) => { setAction((prev) => ({ ...prev, status: event.target.value })); }}
                    defaultValue={type?.rowData?.status}
                  />


                </Col>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3' style={{ width: "100%" }}>
            <Col sm="6">
              <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={4}>
                  Budget
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    defaultValue={type?.rowData?.budget}
                    onChange={(e) => setAction((prev) => ({ ...prev, budget: e.target.value }))}
                  />
                </Col>

              </Form.Group>
            </Col>
          </Row>
        </div>
        <Comments isTextBox={true}  />
        <Modal.Footer>
          <Button  className="cancelBtn" variant="secondary" onClick={() => handleEditActionHide()}>
            Close
          </Button>
          <Button className='saveBtn' variant="primary" type='submit'>
            Save
          </Button>
        </Modal.Footer>
      </Form>
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
          {type?.rowData?.title} Action Updated Successfully!.
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
         {type?.rowData?.title} Action Update Failed!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
     </>
  )
}
export default EditAction;