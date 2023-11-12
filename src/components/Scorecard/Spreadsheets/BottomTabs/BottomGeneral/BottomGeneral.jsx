import React, { useContext, useState } from 'react';
import "./BottomGeneral.css"
import Form from 'react-bootstrap/Form';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { Avatar } from '@mui/material';
import {Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { rootUrl } from '../../../../../Constants';
import { useAutosave } from 'react-autosave';

const BottomGeneral = () => {
  const { indicators, themeData, getSpreadsheetTable, type, kpis} = useContext(SpreadsheetContext);

    const [kPI, setKpi] = useState({});
    const [focus,setFocus]=useState(false);
    const [goal, setGoal] = useState({ title: "",
    description: "",
    row: "",
    theme: "",
    id: ""});
    const [action, setAction] = useState({});
    const [pers, setPerspective] = useState({
      record_id: '',
      analysis_type: '',
      name: '',
      description: '',
      question: '',
      color: '',
      display_name: '',
      company_id: ''
    })
  const handleSubmit = async () => {
    if (type?.name === "perspective") {
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update_perspective`, {
        record_id: type?.id,
        analysis_type: 4,
        name: pers?.display_name ? pers.display_name?.toLowerCase() : type?.rowData?.name,
        description: pers.question ? pers.question : type?.rowData?.question,
        question: pers.question ? pers.question : type?.rowData?.question,
        color: type?.rowData.color,
        color: type?.rowData.color,
        display_name: pers?.display_name ? pers.display_name : type?.rowData?.display_name,
        company_id: 1
      })
        .then(function (response) {
          getSpreadsheetTable();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else if (type?.name === "goal") {
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=obj`, {
        title: goal.title ? goal.title : type?.title,
        description: goal.description ? goal.description : type?.rowData.description,
        row: goal.row ? goal.row : type?.rowData.row,
        theme: goal.theme,
        id: type?.id
      })
        .then(function (response) {
          getSpreadsheetTable();
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  
    else if (type?.name === "kpi") {
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=kpi&arg1=${type?.rowData.oid}`, {
        title: kPI?.title ? kPI?.title : type?.rowData?.title,
        description: kPI?.description ? kPI?.description : type?.rowData?.description,
        source: type?.rowData?.source,
        default_target_value: type?.rowData?.default_target_value,
        default_update_interval: type?.rowData?.default_update_interval,
        measure_unit: type?.rowData?.measure_unit,
        id: type?.id,
        indicator_type: kPI.indicator_type?kPI.indicator_type:type?.rowData?.indicator_type,
        quant_weight: kPI?.quant_weight ? kPI?.quant_weight : type?.rowData?.quant_weight,
        qual_weight: type?.rowData?.qual_weight,
        measure: kPI?.measure ? kPI?.measure : type?.rowData?.measure,
        owner: "amaiello",
        planned_start_date: type?.rowData?.planned_start_date,
        planned_end_date: type?.rowData?.planned_end_date,
        target_value: kPI?.target_value ? kPI?.target_value : type?.rowData?.target_value,
        on_day: type?.rowData?.on_day,
        group_by: type?.rowData?.group_by,
        max_updates: type?.rowData?.max_updates,
        min: kPI?.min ? kPI?.min : type?.rowData?.min,
        max: kPI?.max ? kPI?.max : type?.rowData?.max,
        oid: type?.rowData?.oid,
        update_interval: type?.rowData?.update_interval,
        performance_function: "average",
        value: kPI?.value ? kPI?.value : type?.rowData?.value,
        baseline: kPI?.baseline ? kPI?.baseline : type?.rowData?.baseline,
        actual_values: kpis?.filter((kp) => kp.id === type?.id)[0]?.actual_values?kpis?.filter((kp) => kp.id === type?.id)[0]?.actual_values:[],
        planned_values: kpis?.filter((kp) => kp.id === type?.id)[0]?.planned_values?kpis?.filter((kp) => kp.id === type?.id)[0]?.planned_values:[]

      }
      )
        .then((res) => {
          getSpreadsheetTable();

        })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=task&arg1=${type?.rowData?.oid}`, {
        ID: type?.id,
        owner: type?.rowData.created_by,
        title: action.title ? action.title : type?.rowData.title,
        description: action.description ? action.description : type?.rowData.description,
        ID: type?.id,
        owner: type?.rowData.created_by,
        title: action.title ? action.title : type?.rowData.title,
        description: action.description ? action.description : type?.rowData.description,
        percent_complete: type?.rowData?.percent_complete,
        type: type?.rowData?.type,
        status: type?.rowData?.status,
        timeline: type?.rowData?.timeline,
        budget: type?.rowData?.budget,
        date_complete:type?.rowData.actual_end_date,
        scheduled_completion:type?.rowData.actual_end_date,
        actual_start_date:type?.rowData.actual_start_date,
        planned_start_date:type?.rowData.planned_start_date,
        planned_end_date:type?.rowData.planned_end_date,
        quant_weight: type?.rowData.quant_weight,
        qual_weight: type?.rowData.qual_weight,
        forecast_date: type?.rowData.forecast_date
     
     
      })
        .then((res) => {
          getSpreadsheetTable();
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
  const handleData=(type)=>{

    switch(type?.name)
    {
      case "scorecard":{break;}
      case "goal":{return goal;}
      case "kpi":{return kPI;}
      case "action":{return action;}
      case "perspective":{return pers;}
      default:{break;}
    }
  }


  useAutosave({ data: handleData(type), onSave: handleSubmit,saveOnUnmount:false });
  return (
    <Form className='general-bottom-section'>
      <div className='input-wrapper-columns input-flex-width'>
        <div className='input-body-style'>
          <Form.Group className="mb-2 title" controlId="exampleForm.ControlInput1">
          {
            type?.name == "perspective"?
            <Form.Control
            placeholder="Title"
            defaultValue={focus?type?.rowData.display_name:type?.rowData.display_name}
            onFocus={()=>setFocus(true)}
            onChange={(e) => {
              setFocus(false);
                setPerspective((prev) => ({ ...prev, display_name: e.target.value }))
            }}
          />:
          <Form.Control
          placeholder="Title"
          defaultValue={type?.rowData?.title}
          disabled={type?.name === "scorecard"}
          onChange={(e) => {
            if(type?.name === "kpi")
              setKpi((prev) => ({ ...prev, title: e.target.value }))
            else if (type?.name === "goal")
              setGoal((prev) => ({ ...prev, title: e.target.value }))
            else if (type?.name === "action")
              setAction((prev) => ({ ...prev, title: e.target.value }))
          }}

        />
          }
           
          </Form.Group>
          <Form.Group className="mb-2 title" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              placeholder='Description-text'
              rows={3}
              defaultValue={type?.name === "perspective" ? type?.rowData.question : type?.rowData?.description}
          
              onChange={(e) => {
               
                if (type?.name === "perspective")
                  setPerspective((prev) => ({ ...prev, question: e.target.value }))
              
                else if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, description: e.target.value }))
             
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, description: e.target.value }))
                
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, description: e.target.value }))
              }}
            />
          </Form.Group>
        </div>
        {
         
          type?.id !== "" ?
            <div className='owner-details-body'>
              <div>Owner</div>
              <div>
                <Avatar>{type?.rowData?.created_by ? type?.rowData?.created_by[0]?.charAt(0).toUpperCase() : ""}</Avatar>
              </div>
              <div>{type?.rowData?.created_by ? (type?.rowData?.created_by == 2 ? "Amaiello" : type?.rowData?.created_by) : ""}</div>
            </div> : <></>
        }
      </div>
      <div className='input-wrapper-columns middle-flex-width'>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="5"  >
            Value
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              defaultValue={type?.rowData.value}
            
              onChange={(e) => {
              
                if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, value: e.target.value }))
               
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, value: e.target.value }))
              
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, value: e.target.value }))
              }}
              disabled={type?.name === "scorecard" || type?.name === "perspective"}
           
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="5">
            Baseline
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              defaultValue={type?.rowData.baseline}
           
              onChange={(e) => {
              
                if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, baseline: e.target.value }))
              
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, baseline: e.target.value }))
               
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, baseline: e.target.value }))
              }}
              disabled={type?.name === "scorecard" || type?.name === "perspective"}
              
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="5">
            Target
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              defaultValue={type?.rowData.target_value}
            
              onChange={(e) => {
               
                if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, target_value: e.target.value }))
           
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, target_value: e.target.value }))
                
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, target_value: e.target.value }))
              }
              }
              disabled={type?.name!=="kpi"}
            
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="5">
            Weight
          </Form.Label>
          <Col sm="7">
            <Form.Control
              type="number"
              defaultValue={type?.name === "kpi" ? type?.rowData?.quant_weight : type?.rowData?.weight}
     
              onChange={(e) => {
               
                if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, quant_weight: e.target.value }))
                
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, quant_weight: e.target.value }))
              
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, quant_weight: e.target.value }))
              }
              }
              disabled={type?.name === "scorecard" || type?.name === "perspective"}
             
            />
          </Col>
        </Form.Group>

      </div>
      <div className='input-wrapper-columns last-flex-width '>
        <Form.Group as={Row} className="mb-2" controlId="formPlaintextPassword">
          <Form.Label column sm="6">
            Performance
          </Form.Label>
          <Col style={{ display: "flex" }} sm="6">
            <Form.Control type="number" defaultValue={type?.rowData.min} disabled={type?.name !== "kpi"} onChange={(e) => setKpi((prev) => ({ ...prev, min: e.target.value }))} />
            <Form.Control type="number" defaultValue={type?.rowData.max} disabled={type?.name !== "kpi"} onChange={(e) => setKpi((prev) => ({ ...prev, max: e.target.value }))} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="6">
            Indicator Type
          </Form.Label>
          <Col sm="6">
            <Form.Select aria-label="Default select example" onChange={(e) => setKpi((prev) => ({ ...prev, indicator_type: e.target.value }))} defaultValue={type?.rowData?.indicator_type} disabled={type?.name !== "kpi"}>
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
        <Form.Group as={Row} className="mb-2" controlId="formPlaintextPassword">
          <Form.Label column sm="6">
            Strategic Theme
          </Form.Label>
          <Col sm="6">
         
            <Form.Select aria-label="Default select example" disabled={type?.name !== "kpi"}>
              {
                themeData.map((pers, index) => {
                  return (
                    <option key={index} value={pers.title}>{pers.title}</option>
                  )
                })
              }
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2 " controlId="formPlaintextPassword">
          <Form.Label column sm="6">
            Measure
          </Form.Label>
          <Col sm="6">
            <Form.Control
              type="text"
              defaultValue={type?.rowData.measure}
             
              onChange={(e) => {
               
                if (type?.name === "kpi")
                  setKpi((prev) => ({ ...prev, measure: e.target.value }))
             
                else if (type?.name === "goal")
                  setGoal((prev) => ({ ...prev, measure: e.target.value }))
              
                else if (type?.name === "action")
                  setAction((prev) => ({ ...prev, measure: e.target.value }))
              }
              }
              disabled={type?.name === "scorecard" || type?.name === "perspective"}
            
            />
          </Col>
        </Form.Group>
      </div>
    </Form>
  )
}

export default BottomGeneral;
