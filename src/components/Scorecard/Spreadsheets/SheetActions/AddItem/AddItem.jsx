import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import Comments from "../Comments/Comments"
import "./AddItem.css"
import axios from "axios"
import { Toast, ToastContainer } from "react-bootstrap";
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import NewPerspective from '../NewPerspective/NewPerspective';
import { rootUrl } from '../../../../../Constants';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



const AddItem = ({ AddItemShow, handleAddItemHide}) => {
  const {scorecards,tasks,getSpreadsheetTable,type,tableData}=useContext(SpreadsheetContext);
  const [validated, setValidated] = useState(false);
  const [addPer,setAddPer]=useState(false);
  const[errorMessage, setErrorMessage] = useState({
    goal: false,
    kpi: false,
    action: false
  })
  const [toggleShow, setToggleShow] = useState({
    goal: false,
    kpi: false,
    action: false
  })
  const [toggleErrorShow, setToggleErrorShow] = useState({
    goal: false,
    kpi: false,
    action: false
  })
  const isGoalNameExist = (name) => {
    return tableData?.objectives?.some((obj) => obj?.title.toLowecase === goal?.title)
  }
  const isKpiNameExist = (name) => {
    return tableData?.perspectives?.some((kpi) => {
      return kpi?.objectives?.some((objective) => {
        return objective?.kpis?.some((kpiItem) => {
          return kpiItem.title.toLowerCase() === name.toLowerCase();
        });
      });
    });
  }
  const isActionNameExist = (name) => {
    return tableData?.objectives?.kpis?.some((obj) => obj?.title.toLowecase === goal?.title)
  }
 const toggleToast = () => 
 toggleShow.goal ? setToggleShow((prev) => ({...prev, goal:false})): 
toggleShow.kpi ? setToggleShow((prev) => ({...prev, kpi:false})) : 
toggleShow.action ? setToggleShow((prev) => ({...prev, action:false})): ""

const toastErrorClose = () => 
  toggleErrorShow.goal ? setToggleErrorShow((prev) => ({...prev, goal:false})):
  toggleErrorShow.kpi ? setToggleErrorShow((prev) => ({...prev, kpi:false})):
  toggleErrorShow.action ? setToggleErrorShow((prev) => ({...prev, action:false})): ""
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    row:type?.rowData?.display_name?type?.rowData?.display_name.toLowerCase():
    "",
    task:0,
    project_id:tableData.id?tableData.id:"",
    theme: "NULL"
  })
  const [addItemComment, setAddItemComment] = useState({
    "note_text": ""
  })
  const handlePostAddItemComment = async (id) => {
    await axios.post(`${rootUrl}/ObjectiveServlet?action=create_comment`, {
      item_id: id,
      item_type: type.name==="goal"?"objective":type.name,
      created_by: "amaiello",
      note_text: addItemComment.note_text
    })
}
  const handleTask=async(task)=>{
   switch(task.toString())
    {
      case "0":{
        const startTimeStamp = new Date().getTime()
        const startDate = new Date(startTimeStamp)
        startDate.setFullYear(startDate.getFullYear() + 1);
        const oneYearLaterTimestamp = startDate.getTime();
          await axios.post(`${rootUrl}/ObjectiveServlet?action=create&arg=kpi&arg1=${type.id}`,
          {
            goal_id: type.id,
            title: goal.title,
            description: goal.description,
            source: "",
            measure_unit: "count",
            username: "amaiello",
            owner: "amaiello",
            indicator_type: "",
            baseline: 0.0,
            target: 0.0,
            value: 0.0,
            weight: 0.0,
            performance_function: "max",
            planned_start_date: startTimeStamp,
            planned_end_date:oneYearLaterTimestamp,
            max_updates: "target_reached",
            theme: "null",
            update_interval: "",
            min: 0.0,
            max: 0.0
        })
          .then((res) => {
            getSpreadsheetTable();
            setGoal({
              title: "",
              description: "",
              row: "",
              task:"",
              project_id:'',
              theme: ""
            })
            handleAddItemHide();
            setToggleShow((prev) => ({...prev, kpi:true }))
          })
          .catch((error) => {
            console.log(error)
            handleAddItemHide();
            setToggleErrorShow((prev) => ({...prev,kpi:true}))
          })
          break;
             
      }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "10":{
        await axios.post(`${rootUrl}/ObjectiveServlet?action=create&arg=action&arg1=${type.id}`,
        {
          title: goal.title,
          description: goal.description,
          type_id:goal.task,
          goal_id: type.id,
          username: "amaiello"
        })
        .then((res) => {
          getSpreadsheetTable();
          setGoal({
            title: "",
            description: "",
            row: "",
            task:"",
            project_id:'',
            theme: ""
          })
          handleAddItemHide();
          setToggleShow((prev) => ({...prev, action:true }))
          setToggleShow((prev) => ({...prev, action:true }))
        })
        .catch((error) => {
          console.log(error)
          handleAddItemHide();
          setToggleErrorShow((prev) => ({...prev,action:true}))
        })
        break;
      }
      default:{
        const startTimeStamp = new Date().getTime()
        const startDate = new Date(startTimeStamp)
        startDate.setFullYear(startDate.getFullYear() + 1);
        const oneYearLaterTimestamp = startDate.getTime();
          await axios.post(`${rootUrl}/ObjectiveServlet?action=create&arg=kpi&arg1=${type.id}`,
        {
          goal_id: type.id,
          title: goal.title,
          description: goal.description,
          source: "",
          measure_unit: "count",
          username: "amaiello",
          owner: "amaiello",
          indicator_type: "",
          baseline: 0.0,
          target: 0.0,
          value: 0.0,
          weight: 0.0,
          performance_function: "max",
          planned_start_date: startTimeStamp,
          planned_end_date:oneYearLaterTimestamp,
          max_updates: "target_reached",
          theme: "null",
          update_interval: "",
          min: 0.0,
          max: 0.0
      })
        .then((res) => {
          getSpreadsheetTable();
          setGoal({
            title: "",
            description: "",
            row: "",
            task:"",
            project_id:'',
            theme: ""
          })
          handleAddItemHide();
          setToggleShow((prev) => ({...prev, kpi:true }))

        })
        .catch((error) => {
          console.log(error)
          handleAddItemHide();
          setToggleErrorShow((prev) => ({...prev,kpi:true}))
        })
        break;
        
      }
    }
  }

 
const addGoal=async()=>{
  await axios.post(`${rootUrl}/ObjectiveServlet?action=create&arg=obj&arg1=${goal.project_id?goal.project_id:tableData.id}`,
  {
    title: goal.title,
    description: goal.description,
    row: goal?.row,
    project_id: goal.project_id?goal.project_id:tableData.id,
    theme: "NULL",
    user_id: "2"
  })
  .then((res) => {
    getSpreadsheetTable();
     setGoal({
      title: "",
      description: "",
      row: "",
      task:"",
      project_id:'',
      theme: ""
    })
    handleAddItemHide();
    setToggleShow((prev) => ({...prev, goal:true }))
  })
  .catch((error) => {
    console.log(error)
    handleAddItemHide();
    setToggleErrorShow((prev) => ({...prev,goal:true}))
  })
}
  const handleGoalSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true)
    }
    else {
      if(type.name==="scorecard")
      addGoal()
      else if(type.name==="perspective")
      addGoal();
      else
      handleTask(goal?.task);
    }

  }

  return (
    
    <>
    <Modal show={AddItemShow} onHide={()=> { setGoal({
      title: "",
      description: "",
      row: "",
      task:"",
      project_id:'',
      theme: ""
    }); handleAddItemHide(); }} fullscreen={true}>
      <Modal.Header closeButton>
       <div className='new-header'>
          <img alt="" src="/images/scorecard/spreadsheets/table-actions/vnc-black-white.svg" />
         <div>Add New Item</div>
        </div>
      </Modal.Header>
    
    
      <Form noValidate validated={validated} onSubmit={handleGoalSubmit}>
        <div className='actions-item'>
        <div className='actions-item'>
          <div className='additem-options-row'>
            <Form.Group
              className=" options-style"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Scorecard</Form.Label>
              {
                type.name==="goal"|| type.name==="kpi"?
                <Form.Control
                type="text"
                defaultValue={tableData?.name}
                disabled
              />
               
              :
              <Form.Select aria-label="Default select example" className='dropdown-style'
              onChange={(event) => setGoal((prev) => ({ ...prev, project_id: event.target.value }))}
              defaultValue={tableData.id}
            >
            {errorMessage?.kpi && (          
            <>
            <Stack sx={{ width: '100%', marginTop: "4px" }} spacing={2}>
                   <Alert severity="error">The Name already exists in database!</Alert>
             </Stack> 
            </>
          )}
                  <option  value={tableData.id}>{tableData.name}</option>
            {
              scorecards.filter((scr)=>scr.id!==tableData.id).map((score, index) => {
                return (
                  <option key={index} value={score.id}>{score.name}</option>
                )
              })
            }
          
            </Form.Select>
              }
             
            </Form.Group>
            <Form.Group
              className=" options-style"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Perspective</Form.Label>
              {
                type.name==="goal" || type.name==="kpi"?
                <Form.Control
                type="text"
                defaultValue={tableData?.perspectives?.filter((goal, i, arr) => arr.map((ele) => ele.name).indexOf(goal.name) === i)[0].display_name}
                disabled
              />:
              <Form.Select aria-label="Default select example" className='dropdown-style'
                onChange={(event) =>{ 
                  if(event.target.value!=="perspective")
                  setGoal((prev) => ({ ...prev, row: event.target.value })); 
                else
                setAddPer(true)
                
                }}
              >
                {
                  tableData?.perspectives?.filter((goal, i, arr) => arr.map((ele) => ele.name).indexOf(goal.name) === i)?.map((pers,index) => {
                    return (
                      <option key={index} value={pers.display_name.toLowerCase()}>{pers?.display_name}</option>
                    )
                  })
                }
                <option value={"perspective"}>Add New Perspective</option>
              </Form.Select>
              }
              <Form.Control.Feedback type="invalid">
                Scorecard cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className=" options-style"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>Item Type</Form.Label>
              {type.name==="scorecard"||type.name==="perspective"?
              <Form.Control
              type="text"
              className='input-height'
              disabled
              defaultValue={"Goal"}
              required
            />:
              <Form.Select aria-label="Default select example" className='dropdown-style'
              defaultValue={"Goal"}
                onChange={(event) => {setGoal((prev) => ({ ...prev, task: event.target.value }));}}
                required
              >
                 {
                  tasks.map((pers,index) => {
                    return (
                      <option key={index}  style={{color:type.name==="scorecard"?"#ADB5BD":""}} value={pers.id}>{pers.name}</option>
                    )
                  })
                }
              </Form.Select>
              }
              <Form.Control.Feedback type="invalid">
                Task Item cannot be empty
              </Form.Control.Feedback>
            </Form.Group>
          
            <Form.Group
              className=" options-style input-height"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className='description-label'>{(type.name==="scorecard"||type.name==="perspective")?"Goal Name":goal.task?tasks.filter((pers)=>pers.id===Number(goal.task))[0]?.name:"KPI"}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                className='input-height'
                onChange={(event) => setGoal((prev) => ({ ...prev, title: event.target.value }))
                }
                required
              />
              <Form.Control.Feedback type="invalid">
              Name cannot be empty
            </Form.Control.Feedback>
           
            </Form.Group>
            <Form.Group
              className=" options-style margin-top"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label className='description-label' >Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write item description"
                onChange={(event) => setGoal((prev) => ({ ...prev, description: event.target.value }))}
                rows={4}
              />
            </Form.Group>
          </div>
          <Comments isTextBox={false} setAddItemComment={setAddItemComment}/>
        </div>
       
        <div className='footer'>
          <Button className='cancelBtn' variant="secondary" onClick={handleAddItemHide}>
            Close
          </Button>
          <Button className='saveBtn' variant="primary" type="submit">
            Save
          </Button>
        </div>
        </div>
      </Form>
      <NewPerspective addPer={addPer} setAddPer={setAddPer}/>
    </Modal>
    <ToastContainer position="top-center">
        <Toast
          show={toggleShow.goal}
          onClose={toggleToast}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Goal Added Successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={toggleShow.kpi}
          onClose={toggleToast}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            KPI Added Successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={toggleShow.action}
          onClose={toggleToast}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Action Added Successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={toggleErrorShow.goal}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          Adding Goal Failed!
          </Toast.Body>
        </Toast>
        <Toast
          show={toggleErrorShow.kpi}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          Adding KPI Failed!.
          </Toast.Body>
        </Toast>
        <Toast
          show={toggleErrorShow.action}
          onClose={toastErrorClose}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
          Adding Action Failed!.
          </Toast.Body>
        </Toast>
      </ToastContainer>
     </>
  )
}
export default AddItem;