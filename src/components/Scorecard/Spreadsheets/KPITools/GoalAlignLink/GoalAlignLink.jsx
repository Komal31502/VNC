import React, { useState, useContext } from 'react'
import axios from 'axios';
import './GoalAlignLink.css'
import { rootUrl } from "../../../../../Constants";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Divider from '@mui/material/Divider'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { Button, Toast, ToastContainer, Row, Col, ModalBody } from "react-bootstrap";
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { GroupScoreMenu } from "./MenuFunctions"
import { SourceItemMenu } from "./MenuFunctions"


const GoalAlignLink = ({ showGoalAlign, setShowGoalAlign }) => {
  const { type, scoreId } = useContext(SpreadsheetContext);
  const [flag, setFlag] = useState({
    destScore:false,
    destItem:false
  })
  const [anchorEl, setAnchorEl] = useState({
    'sourceScoreNode': null,
    'sourceItemNode': null,
    'destScoreNode': null,
    'destItemNode': null
  });
  const handleCloseMenu = (selectedField) => {
    setAnchorEl((prev) => ({
      ...prev,
      [selectedField]: null,
    }));
  }
  const [formDetails, setFormDetails] = useState({
    sourceScorcard: "",
    sourceItem: "",
    destScorecard: "",
    destItem: ""
  })
  const [sourceItems, setSourceItems] = useState([])

  const getSourceItems = async (id) => {
    await axios.get(`${rootUrl}/SpreadsheetServlet?action=get&company=1&scorecard=${id}&map_type=SSC`)
      .then((res) => {
        setSourceItems(res.data?.data?.perspectives)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const [goalPaste, setGoalPaste] = useState({
    destination_card:0,
    destination_perspective: "",
    new_title: "copied Goal",
    user_id: 2,
    id:""
  }
  )
  const handleItemSelect = (value) => {
   const sourceScoreId = value?.id
   if(anchorEl?.sourceScoreNode){
    setFormDetails((prev) => ({...prev, sourceScorcard: value?.name }))
    getSourceItems(sourceScoreId)
    handleCloseMenu('sourceScoreNode');
   }
   else if(anchorEl?.sourceItemNode){
    setGoalPaste((prev) => ({ ...prev, id: value?.id }))
    setFormDetails((prev) => ({...prev, sourceItem: value?.name }))
    handleCloseMenu('sourceItemNode');

   }else if(anchorEl?.destScoreNode){
    setGoalPaste((prev) => ({ ...prev, recievingScoreNode: value }))
   }else if(anchorEl?.recievingScoreNode){
    setGoalPaste((prev) => ({ ...prev, recievingItemNode: value }))
   } 
  };
  return (
    <>
      <Modal show={showGoalAlign} onHide={() => setShowGoalAlign(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className='goal-align-header'>
              <div style={{ marginRight: "10px" }}>
                <img alt="" src="/images/scorecard/spreadsheets/table-actions/vnc-black-white.svg" />
              </div>
              <div>GOALS- ALIGN , LINK, PASTE</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <ModalBody>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='goal-align-labels' column sm={4}>
                Source Scorecard
              </Form.Label>
              <Col sm={8}>
                <Form.Select  onClick={(event) => {
                  const currentTarget = event.currentTarget
                  setAnchorEl((prev) => ({
                    ...prev,
                    sourceScoreNode: currentTarget
                  }));
                }} defaultValue={"kkkkkkkkkkk"} required>
                  <option value={formDetails?.sourceScorcard}>{formDetails?.sourceScorcard}</option>                
                </Form.Select>
                <GroupScoreMenu anchorEl={anchorEl?.sourceScoreNode} handleItemSelect={handleItemSelect} handleCloseMenu={() => handleCloseMenu('sourceScoreNode')} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='goal-align-labels' column sm={4}>
                Source Item
              </Form.Label>
              <Col sm={8}>
                <Form.Select aria-label="Default select example" onClick={(event) => {
                  const currentTarget = event.currentTarget
                  setAnchorEl((prev) => ({
                    ...prev,
                    sourceItemNode: currentTarget
                  }));
                }}defaultValue={""} required >
                  <option value={formDetails?.sourceItem}>{formDetails?.sourceItem}</option>
                </Form.Select>
                <SourceItemMenu anchorEl={anchorEl?.sourceItemNode} handleItemSelect={handleItemSelect} sourceItems={sourceItems} handleCloseMenu={() => handleCloseMenu('sourceItemNode')} />
              </Col>
            </Form.Group>
            <Divider style={{ width: "95%" }} variant="middle" className='mb-4 mt-4'><ArrowDownwardOutlinedIcon style={{ color: "grey", height: "30px" }} /> </Divider>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='goal-align-labels' column sm={4}>
                Recieving Scorecard
              </Form.Label>
              <Col sm={8}>
                <Form.Select value={""} onClick={(event) => {
                  const currentTarget = event.currentTarget
                  setAnchorEl((prev) => ({
                    ...prev,
                    destScoreNode: currentTarget
                  }))
                }} required>
                  <option value={""}>{""}</option>
                </Form.Select>
                <GroupScoreMenu anchorEl={anchorEl?.destScoreNode} handleItemSelect={handleItemSelect} handleCloseMenu={() => handleCloseMenu('destScoreNode')} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
              <Form.Label className='goal-align-labels' column sm={4}>
                Recieving Item
              </Form.Label>
              <Col sm={8}>
                <Form.Select aria-label="Default select example" onClick={(event) => {
                  const currentTarget = event.currentTarget
                  setAnchorEl((prev) => ({ ...prev, recievingItem: currentTarget }))
                }}>
                </Form.Select>
              </Col>
            </Form.Group>
            <Modal.Footer>
              <button className={`saveButton colorBtn`}>
                <span style={{ marginRight: "5px" }}>
                  <img src="/images/scorecard/spreadsheets/goal-align-link/paste.svg" alt="" />
                </span>
                Paste Item
              </button>
              <button className={`saveButton ${type.name === "goal" || type.name === "" ? "colorBtn " : "greyBtn"}`} >
                <span style={{ marginRight: "5px" }}>
                  <img src="/images/scorecard/spreadsheets/goal-align-link/align.svg" alt="" />
                </span>
                Align Item
              </button>
              <button className={`saveButton ${type.name === "goal" || type.name === "" ? "colorBtn" : "greyBtn"}`} >
                <span style={{ marginRight: "5px" }}>
                  <img src="/images/scorecard/spreadsheets/goal-align-link/link.svg" alt="" />
                </span>
                Link Item
              </button>

            </Modal.Footer>
          </Form>
        </ModalBody>

      </Modal>
    </>
  )
}

export default GoalAlignLink;

