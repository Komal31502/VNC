import React, { useState, useContext, useEffect, useRef } from 'react'
import { Button, Toast, ToastContainer, Row, Col, ModalBody } from "react-bootstrap";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import axios from "axios"
import './ValuesEditor.css'
import { rootUrl } from '../../../../../Constants';
import PlanningTool from "../../KPITools/PlanningTool/PlanningTool"


const ValuesEditor = ({ showValuesEditor, setShowValuesEditor }) => {
    const [newDateFlag, setNewDateFlag] = useState(false)
    const { getKPI, type  } = useContext(SpreadsheetContext);
    const [toastShow, setToastShow] = useState(false);
    const toggleToast = () => {
        setToastShow(!toggleToast)
    }
    const [planToolShow, setPlanToolShow] = useState(false);
    const [plannedPoints, setPlannedPoints] = useState([])



    const getKPIPlannedPoints = async () => {
        await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=kpi_planned_points&kpi_id=${type?.rowData?.id}&objective_id=${type?.rowData?.oid}`)
            .then((res) => {
                setPlannedPoints(res.data.data.filter((point) => point.delete_flag !== 1))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [editedKpi, setEditedKpi] = useState(
        {
            title: type?.rowData?.title,
            description: type?.rowData?.description,
            source: "" || "manual",
            default_target_value: "100",
            measure_unit: "velocity",
            id: type?.rowData?.id?.toString(),
            indicator_type: type?.rowData?.indicator_type,
            quant_weight: type?.rowData?.quant_weight?.toString(),
            qual_weight: type?.rowData?.qual_weight,
            planned_start_date: type?.rowData?.planned_start_date,
            planned_end_date: type?.rowData?.planned_end_date,
            update_interval: type?.rowData?.update_interval || "quarterly",
            group_by: "" || "document",
            max_updates: type?.rowData?.max_updates,
            performance_function: "average",
            owner: "amaiello",
            target_value: type?.rowData?.target_value?.toString(),
            on_day: type?.rowData?.on_day?.toString(),
            min: type?.rowData?.min,
            max: type?.rowData?.max,
            oid: type?.rowData?.oid,
            value: type?.rowData?.value,
            baseline: type?.rowData?.baseline,
            default_update_interval: "monthly",
            actual_values: [
                {
                    kpi_id: type?.rowData?.id,
                    obj_id: type?.rowData?.oid,
                    point_date: "",
                    min: "",
                    baseline: "",
                    value: "",
                    target: "",
                    max: "",
                    created_by: "",
                    notes: ""
                }
            ],
            planned_values:plannedPoints,
           
        }
    )
  
    const DeletePlannedPoints = async (id) => {
        await axios.post(`${rootUrl}/ObjectiveServlet?action=remove_kpi_planned_point`, {
            planned_point_id: id
        }).then((res) => {
            getKPIPlannedPoints()
        })
    }

    const handleEditedKPI = async (event) => {
        event.preventDefault();
        const updatedKpi = {...editedKpi, planned_values:plannedPoints};
    
        await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=kpi&arg1=${type?.rowData?.oid}`,
        updatedKpi
      
        )
            .then(function (response) {
                setShowValuesEditor(false)
                setToastShow(true)
                setShowValuesEditor(false)
                setToastShow(true)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        if (newDateFlag) {
            getKPIPlannedPoints();
          
        }
    }, [newDateFlag]);

    return (
        <>
            <Modal show={showValuesEditor} onHide={() => setShowValuesEditor(false)} size="lg">
                <Modal.Header closeButton>
                    <div className='planning-tool-header'>
                        <div className='modals-headers'>
                            <div style={{ marginRight: "10px" }}>
                                <img alt="" src="/images/scorecard/spreadsheets/table-actions/vnc-black-white.svg" />
                            </div>
                            <div className='header-subheader-container'>
                                <div>Values Editor</div>
                                <div className='subheader-flex'>KPI:{type?.rowData?.title}</div>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <ModalBody>
                    <Form onSubmit={handleEditedKPI} >
                        <Row className="mb-4">
                            <Form.Group as={Col} className="mx-3 " controlId="formGridEmail">
                                <Form.Label className='label-size'>Update</Form.Label>
                                <Form.Select className='font-size-16px' aria-label="Default select example" defaultValue={type?.rowData?.update_interval}
                                    onChange={
                                        (event) => {
                                            setEditedKpi((prev) => ({ ...prev, update_interval: event.target.value })); getKPIPlannedPoints()
                                        }}

                                >
                                    <option className='font-size-16px' value="monthly">1st Every Month</option>
                                    <option className='font-size-16px' value="quarterly">1st Every Quarter</option>
                                    <option className='font-size-16px' value="half">1st Every Six Months</option>
                                    <option className='font-size-16px' value="overwrite">Overwrite existing values</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className="mx-3 " controlId="formGridPassword">
                                <Form.Label className='label-size'>On day</Form.Label>
                                <Form.Select aria-label="Default select example" defaultValue={type?.rowData?.on_day}
                                    onChange={(event) => { setEditedKpi((prev) => ({ ...prev, on_day: event.target.value })); getKPIPlannedPoints() }}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">
                            <Form.Group as={Col} className="mx-3" controlId="formGridEmail">
                                <Form.Label className='label-size'>View Source</Form.Label>
                                <Form.Select aria-label="Default select example" className='label-size' value={type?.rowData?.source}
                                    onChange={(event) => { setEditedKpi((prev) => ({ ...prev, source: event.target.value })); getKPIPlannedPoints() }}
                                >
                                    <option className='font-size-16px' value="manual">Manual default(user input)</option>
                                    <option className='font-size-16px' value="2">Import Data from file</option>
                                    <option className='font-size-16px' value="3">Google Sheets</option>
                                    <option className='font-size-16px' value="3">Google Analytics</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} className="mx-3" controlId="formGridPassword">
                                <Form.Label className='font-size-16px'>Group by</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    defaultValue={type?.rowData?.group_by}
                                    className='font-size-16px'
                                    onChange={(event) => { getKPI(); setEditedKpi((prev) => ({ ...prev, group_by: event.target.value })); getKPIPlannedPoints() }}
                                >
                                    <option className='font-size-16px' value="document">Documented Default(avg)</option>
                                    <option className='font-size-16px' value="accumulated">Accumulated</option>
                                    <option className='font-size-16px' value="sum">Sum by Update Interval</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-5 mx-3" >
                            <Col>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='label-size'>Weight</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={type?.rowData?.quant_weight}
                                        onChange={(event) => { setEditedKpi((prev) => ({ ...prev, quant_weight: event.target.value })); getKPIPlannedPoints()}}
                                       
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='label-size'>Min</Form.Label>
                                    <Form.Control
                                        type="text"
                                        defaultValue={type?.rowData?.min}
                                        onChange={(event) => {  setEditedKpi((prev) => ({ ...prev, min: event.target.value })); getKPIPlannedPoints()}}
                                        
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='label-size'>Baseline</Form.Label>
                                    <Form.Control
                                        defaultValue={type?.rowData?.baseline}
                                        type="text"
                                        onChange={(event) => {  setEditedKpi((prev) => ({ ...prev, baseline: event.target.value })); getKPIPlannedPoints() }}
                                  

                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label className='label-size'>Value</Form.Label>
                                    <Form.Control
                                        defaultValue={type?.rowData?.value}
                                        type="text"
                                        onChange={(event) => { setEditedKpi((prev) => ({ ...prev, value: event.target.value })); getKPIPlannedPoints() }}
                                       
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Divider />
                        <TableContainer sx={{
                            maxHeight: '230px',
                            "& .MuiTableRow-root:hover": {
                                backgroundColor: "#ebeef2",
                                cursor: 'pointer'
                            }
                        }}>
                            <Table stickyHeader aria-label="collapsible table" >
                                <TableHead>
                                    <TableRow >
                                        <TableCell className='table-header-class'>Date</TableCell>
                                        <TableCell className='table-header-class' align="right">Min</TableCell>
                                        <TableCell className='table-header-class' align="right">Baseline</TableCell>
                                        <TableCell className='table-header-class' align="right">Value</TableCell>
                                        <TableCell className='table-header-class' align="right">Target</TableCell>
                                        <TableCell className='table-header-class' align="right">Max</TableCell>
                                        <TableCell className='table-header-class' align="right"></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        plannedPoints?.filter((point) => point?.delete_flag !== "1").map((point, index) => {
                                            const dateString = point?.point_date;
                                            const timestamp = parseFloat(dateString?.replace(/[^0-9]/g, ''));
                                            const formattedDate = dayjs(timestamp).format('MM/DD/YY');

                                            return (
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" >
                                                        {formattedDate}
                                                    </TableCell>
                                                    <TableCell align="right">{point?.min.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.baseline.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.value.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.target.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point.min.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.min.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.baseline.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.value.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point?.target.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{point.min.toFixed(2)}</TableCell>
                                                    <TableCell align="right">  <img alt="" src="/images/scorecard/spreadsheets/table-icons/garbagebin.svg" onClick={() => DeletePlannedPoints(point.id)} /></TableCell>
                                                </TableRow>
                                            )
                                        }
                                        )
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div onClick={() => setPlanToolShow(true)} style={{ cursor: 'pointer' }}>
                            <AddOutlinedIcon style={{ color: 'grey' }} /> <span style={{ color: 'grey' }}>Add New Date</span>
                        </div>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowValuesEditor(false)} >
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" >
                                Save
                            </Button>
                        </Modal.Footer>
                    </Form>
                </ModalBody>
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
                        Updated Successfully!.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <PlanningTool planToolShow={planToolShow} setPlanToolShow={setPlanToolShow}  setNewDateFlag={setNewDateFlag} />
        </>
    )
}

export default ValuesEditor