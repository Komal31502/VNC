import React, { useContext, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './EditKPI.css'
import Comments from "../Comments/Comments"
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import axios from 'axios';
import { Toast, ToastContainer } from "react-bootstrap";
import { rootUrl } from '../../../../../Constants';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


const EditKPI = ({ EditKPIShow, handleEditKPIHide }) => {
  const { indicators,getSpreadsheetTable, tableData ,kpis,type} = useContext(SpreadsheetContext);
  const[errorMessage, setErrorMessage] = useState(false)
  const [kPI, setKpi] = useState({});

  const [toastShow, setToastShow] = useState(false)
  const [toastErrorShow, setToastErrorShow] = useState(false)

  const isKpisNameExist = (name) => {
    return kpis?.some((item) => item?.title?.toLowerCase() === name?.toLowerCase())
  }
  const handleKPI = async (e) => {
    e.preventDefault();
    if(isKpisNameExist(kPI?.title)){
      setErrorMessage(true)
    }
    else{
      const kpivalues=type.rowData;
      delete kpivalues.notes;
      delete kpivalues.delete_flag;
      delete kpivalues.orow;
      delete kpivalues.oname;
      delete kpivalues.actual;
      delete kpivalues.performance;
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=kpi&arg1=${type.rowData.oid}`,
      {
       ...kpivalues,
      ...kPI,
      owner: "amaiello",
      performance_function: "average",
      actual_values: kpis?.filter((kp)=>kp.id===type.id)[0]?.actual_values?kpis?.filter((kp)=>kp.id===type.id)[0]?.actual_values:[],
      planned_values: kpis?.filter((kp)=>kp.id===type.id)[0]?.planned_values?kpis?.filter((kp)=>kp.id===type.id)[0]?.planned_values:[]
    })
        .then((res) => {
            getSpreadsheetTable();
            handleEditKPIHide();
            setToastShow(true);
        })
        .catch((error) => {        
          handleEditKPIHide();
          setToastErrorShow(true);
          console.log(error)
        })

    }
   
  }
  const toggleToast = () => {
    setToastShow(!toggleToast)  
  }
  const toastErrorClose = () => {
    setToastErrorShow(!toastErrorShow)
  }

  return (
    <>
      <Modal show={EditKPIShow} onHide={handleEditKPIHide} dialogClassName={"modal-kpi"} size={'lg'}>
        <Modal.Header closeButton>
          <div className='new-header' >
            <div className='kpi-header'><img className='kpi-header' alt="" src="/images/scorecard/spreadsheets/table-icons/KPI.svg" /></div>
            <div>Edit KPI</div>
          </div>
        </Modal.Header>
        <Form onSubmit={handleKPI}>
          <div className='actions-body'>
            <div className='upper-part'>
              <div className='left-part'>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    Scorecard
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      defaultValue={tableData.name}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
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
                <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    KPI Name
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control
                      type="text"
                      defaultValue={type?.rowData?.title}
                      onChange={(e) => {setKpi((prev) => ({ ...prev, title: e.target.value }))
                      isKpisNameExist(e.target.value)
                  setErrorMessage("");  
                      }}

                    />
                     {errorMessage && (
                <>
                <Stack sx={{ width: '100%', marginTop: "4px" }} spacing={2}>
                   <Alert severity="error">The Name already exists in database!</Alert>
             </Stack>           
                </>
                
              )}
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    Description
                  </Form.Label>
                  <Col sm="9">
                    <Form.Control as="textarea" rows={3} defaultValue={type?.rowData?.description} onChange={(e) => setKpi((prev) => ({ ...prev, description: e.target.value }))} />
                  </Col>
                </Form.Group>
                <div className='date-flex'>
                  <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                    <Form.Label column sm="6">
                      Start Date
                    </Form.Label>
                    <Col sm="6">
                      <Form.Control type="date" placeholder="Value(#)" defaultValue={type?.rowData?.planned_start_date} onChange={(e) => {
                        const selectedDate = e.target.value;
                        const dateObject = new Date(selectedDate)
                        const unixTimeStamp = dateObject.getTime()
                        setKpi((prev) => ({ ...prev, planned_start_date: unixTimeStamp.toString() }))
                      }} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Form.Label column sm="5">
                      End Date
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control type="date" placeholder="Value(#)" onChange={(e) => {
                        const selectedDate = e.target.value;
                        const dateObject = new Date(selectedDate)
                        const unixTimeStamp = dateObject.getTime()
                        setKpi((prev) => ({ ...prev, planned_end_date: unixTimeStamp.toString() }))
                      }} />
                    </Col>
                  </Form.Group>
                </div>
                <Row className='mb-3'>
                  <Col sm="3">Owners(s)</Col>
                  <Col sm="9">
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
                <Form.Group as={Row} className="mb-3 " controlId="formPlaintextPassword">
                  <Form.Label column sm="3">
                    Indicator Type
                  </Form.Label>
                  <Col sm="9">
                    <Form.Select aria-label="Default select example" className='kpi-dropdowns' onChange={(e) => setKpi((prev) => ({ ...prev, indicator_type: e.target.value }))} defaultValue={type?.rowData?.indicator_type}>
                      {
                        indicators.map((pers, index) => {
                          return (
                            <option key={index} value={pers.name}>{pers.name}</option>
                          )
                        })
                      }
                    </Form.Select>
                  </Col>
                </Form.Group>
        
              </div>
              <div className='right-part'>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Value
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      className='kpi-dropdowns'
                      placeholder="Value(#)"
                      defaultValue={type?.rowData?.value}
                      onChange={(e) => setKpi((prev) => ({ ...prev, value: e.target.value }))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Baseline
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="text"
                      className='kpi-dropdowns'
                      placeholder="Baseline(#)"
                      defaultValue={type?.rowData?.baseline}
                      onChange={(e) => setKpi((prev) => ({ ...prev, baseline: e.target.value }))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Target
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="text"
                      className='kpi-dropdowns'
                      placeholder="Target(#)"
                      defaultValue={type?.rowData?.target_value}
                      onChange={(e) => setKpi((prev) => ({ ...prev, target_value: e.target.value }))}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Performance
                  </Form.Label>
                  <Col style={{ display: "flex" }} sm="7">

                    <Form.Control type="text" className='kpi-dropdowns'
                      defaultValue={type?.rowData?.min}
                      placeholder="Min" onChange={(e) => setKpi((prev) => ({ ...prev, min: e.target.value }))} />


                    <Form.Control
                      type="text"
                      className='kpi-dropdowns'
                      placeholder="Max"
                      defaultValue={type?.rowData?.max}
                      onChange={(e) => setKpi((prev) => ({ ...prev, max: e.target.value }))} />

                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Weight
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control type="text" className='kpi-dropdowns'
                      defaultValue={type?.rowData?.quant_weight}
                      placeholder="Weight(%)" onChange={(e) => setKpi((prev) => ({ ...prev, quant_weight: e.target.value }))} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                  <Form.Label column sm="5">
                    Measure
                  </Form.Label>
                  <Col sm="7">
                    <Form.Control
                      type="text"
                      defaultValue={type?.rowData?.measure}
                      onChange={(e) => setKpi((prev) => ({ ...prev, measure_value: e.target.value }))}
                    />

                  </Col>
                </Form.Group>
                <div className='radio-button-div'>
                  <div style={{ marginBottom: "15px" }}>When to update</div>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      id="radio1"
                      custom
                      label="1st of Every Month"
                      name="radioGroup"
                      value="monthly"
                      onChange={(event) => setKpi((prev) => ({ ...prev, update_interval: event.target.value }))}
                      checked={kPI?.update_interval === "monthly"}
                    />
                    <Form.Check
                      type="radio"
                      id="radio2"
                      custom
                      label="1st Every Quarter"
                      name="radioGroup"
                      value="quarterly"
                      onChange={(event) => {
                        setKpi((prevKPI) => ({ ...prevKPI, update_interval: "quarterly" }));
                      }}
                      checked={kPI?.update_interval === "quarterly"}
                    />
                    <Form.Check
                      type="radio"
                      id="radio2"
                      custom
                      label="1st Every 6 months"
                      name="radioGroup"
                      value="half"
                      onChange={(event) => {
                        setKpi((prevKPI) => ({ ...prevKPI, update_interval: "half" }));
                      }}
                      checked={kPI?.update_interval === "half"}
                    />
                    <Form.Check
                      type="radio"
                      id="radio2"
                      custom
                      label="Overwrite existing values"
                      name="radioGroup"
                      value="overwrite"
                      onChange={(event) => {
                        setKpi((prevKPI) => ({ ...prevKPI, update_interval: "overwrite" }));
                      }}
                      checked={kPI?.update_interval === "overwrite"}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>
          </div>
          <Comments isTextBox={true} type={type}  />
          <Modal.Footer>
            <Button className='cancelBtn' variant="secondary" onClick={handleEditKPIHide}>
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
           {type?.rowData?.title} KPI Updated Succefully!
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
          {type?.rowData?.title} KPI Update Failed!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
export default EditKPI;