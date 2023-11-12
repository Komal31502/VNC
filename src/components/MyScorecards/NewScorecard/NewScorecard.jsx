import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  businessFrameworks,
  newScorecard,
  scorecardTemplate,
  managementTemplate,
  verticals,
  vncDesignerWizard,
} from "../../../utils/newscorecard";
import "./NewScorecard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Toast, ToastContainer } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { ScorecardContext } from "../../../context/ScorecardContext";
import { rootUrl } from "../../../Constants";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const NewScorecard = ({ disScorecard, setDisScorecard, groupId }) => {
  const { postHistory , scorecards } = useContext(ScorecardContext);
  const [toastShow, setToastShow] = useState(false)
  const [toastErrorShow, setToastErrorShow] = useState(false)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [validated, setValidated] = useState(false);
  const [details, setDetails] = useState(false);
  const[errorMessage, setErrorMessage] = useState(false)
  const toastClose = () => {
    setToastShow(!toastShow)  
  }
  const toastErrorClose = () => {
    setToastErrorShow(!toastErrorShow)
  }
  const [selTemplate, setSelTemplate] = useState([
    ...scorecardTemplate,
    ...businessFrameworks,
    ...managementTemplate,
    ...verticals,
  ]);
  const [score, setScore] = useState({
    name: "",
    description: "",
  });
  const isScoreNameExist = (name) => {
    return scorecards.some((scorecard) => scorecard.name.toLowerCase() === name.toLowerCase());
  };
  const handleClose = () => {setDisScorecard(false); setErrorMessage(false)};
  const handleDetails = () => setDetails(false);

  const switchTemplate = (index) => {
    setActiveTab(index);
    switch (index) {
      case 0: {
        setSelTemplate([
          ...scorecardTemplate,
          ...vncDesignerWizard,
          ...businessFrameworks,
          ...managementTemplate,
          ...verticals,
        ]);
        break;
      }
      case 1: {
        setSelTemplate([
          ...vncDesignerWizard,
          ...scorecardTemplate,
          ...businessFrameworks,
          ...managementTemplate,
          ...verticals,
        ]);
        break;
      }
      case 2: {
        setSelTemplate([
          ...businessFrameworks,
          ...scorecardTemplate,
          ...vncDesignerWizard,
          ...managementTemplate,
          ...verticals,
        ]);
        break;
      }
      case 3: {
        setSelTemplate([
          ...managementTemplate,
          ...scorecardTemplate,
          ...vncDesignerWizard,
          ...businessFrameworks,
          ...verticals,
        ]);
        break;
      }
      case 4: {
        setSelTemplate([
          ...verticals,
          ...scorecardTemplate,
          ...vncDesignerWizard,
          ...businessFrameworks,
          ...managementTemplate,
        ]);
        break;
      }
      default: {
        setSelTemplate([
          ...scorecardTemplate,
          ...vncDesignerWizard,
          ...businessFrameworks,
          ...managementTemplate,
          ...verticals,
        ]);
        break;
      }
    }
  };
  const handleScorecard = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      if(isScoreNameExist(score?.name)){
        setErrorMessage(true)
      }else{
        await axios
        .post(`${rootUrl}/ObjectiveServlet?action=create&arg=project`, {
          name: score?.name,
          description: score?.description,
          type: "VNC Strategy Map",
          internal_type: "strategy_map",
          created_by: "amaiello",
          created_date: new Date().getTime(),
          visibility: "private",
          hypothesis: "ask and ye shall receive",
          theme_id: "NULL",
          group_id: groupId ? groupId : "0",
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "create",
            object_type: "scorecard",
            description: `scorecard was created`,
            status: "New",
            object_id: response.data.data[0].id,
            project_id: response.data.data[0].id
          })
          navigate("/spreadsheet",{state:{score:{id:response.data.data[0].id,name:score?.name}}});    
          setDisScorecard(false);
          setDetails(false);
          setToastShow(true)
        })
        .catch(function (error) {
          console.log(error);
          setDisScorecard(false);
          setDetails(false);
          setToastErrorShow(true)
          
        });
      }
     
    }
  };
  return (
    <>
      <Modal
        show={disScorecard}
        onHide={handleClose}
        dialogClassName="new-scorecard"
        size="lg"
      >
        <Modal.Header closeButton>
          <div className="title">New Scorecard</div>
        </Modal.Header>

        <div className="canvas">
          <div className="sidebar">
            <div className="tab">
              {newScorecard.map((item, index) => {
                return (
                  <div
                    className={
                      activeTab === index
                        ? "active-nav-item"
                        : "vertical-nav-item"
                    }
                    key={index}
                    onClick={() => switchTemplate(index)}
                  >
                    <div className="wrapper">
                      <div className="image-wrapper">
                        <img className="wrapper-icon" alt="" src={item.image} />
                      </div>
                      <div className="scorecard">
                        <div className="card-title">{item.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="scorecard-template">
            <>
              {selTemplate.map((temp, index) => {
                return (
                  <div className="title-parent" key={index}>
                    {temp.title ? (
                      <div className="title">
                        <div className="template-text">{temp.title}</div>
                      </div>
                    ) : (
                      <></>
                    )}
                    <div className="template-wrapper">
                      {temp.title === "Default Template" ? (
                        <div
                          className="template"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setDetails(true);
                          }}
                        >
                          <img className="icondefault" alt="" src={temp.image} />
                          <div className="text-and-supporting-text">
                            <div className="card-title">{temp.subtitle}</div>
                            <div className="subtitle">{temp.text}</div>
                          </div>
                          {temp.title === "VNCDesigner Wizard" ? (
                            <div className="coming-badge">
                              <div className="soon-badge">
                                <div className="badge-text">Coming Soon</div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <div className="template">
                          <img className="icondefault" alt="" src={temp.image} />
                          <div className="text-and-supporting-text">
                            <div className="card-title">{temp.subtitle}</div>
                            <div className="subtitle">{temp.text}</div>
                          </div>
                          {temp.title === "VNCDesigner Wizard" ? (
                            <div className="coming-badge">
                              <div className="soon-badge">
                                <div className="badge-text">Coming Soon</div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          </div>
        </div>
      </Modal>
      <>
        <Modal show={details} onHide={handleDetails}>
          <Form noValidate validated={validated} onSubmit={handleScorecard}>
            <Form.Group
              className="my-3 mx-3"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className="labelFont">Scorecard Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Example Scorecard name"
                onChange={(e) =>{
                  setScore((prev) => ({ ...prev, name: e.target.value }))
                  isScoreNameExist(e.target.value)
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
                Scorecard name cannot be empty.
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
                  setScore((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </Form.Group>
            <Modal.Footer>
              <Button className="cancelBtn" onClick={handleDetails}>
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
          Scorecard created successfully!
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
          Scorecard creation failed!
          </Toast.Body>
        </Toast>
      </ToastContainer>
      </>
    </>
  );
};

export default NewScorecard;
