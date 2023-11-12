import React, { useState, useContext, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { Button, Row, Col, ModalBody } from "react-bootstrap";
import { Toast, ToastContainer } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import Divider from '@mui/material/Divider';
import './PlanningTool.css'
import dayjs from 'dayjs';
import { rootUrl } from '../../../../../Constants';

const PlanningTool = ({ planToolShow, setPlanToolShow , setNewDateFlag }) => {
    const { type, getSpreadsheetTable} = useContext(SpreadsheetContext);
    const [generatedPoints, setGeneratedPoints] = useState([])
    const [overwriteChecked, setOverwriteChecked] = useState(false);
    const [roundValues, setRoundValues] = useState(false);
    const [toastShow, setToastShow] = useState(false);
    const toggleToast = () => {
        setToastShow(!toggleToast)
    }

    const [initialPoints, setInitialPoints] = useState({
        id: type?.rowData?.id?.toString(),
        title: type?.rowData?.title,
        description: type?.rowData?.description,
        source: type?.rowData?.source || "manual",
        default_target_value: "100",
        default_update_interval: "monthly",
        measure_unit: "velocity",
        delete_flag: "0",
        indicator_type: type?.rowData?.indicator_type,
        quant_weight: type?.rowData?.quant_weight?.toString(),
        qual_weight: type?.rowData?.qual_weight,
        planned_start_date: type?.rowData?.planned_start_date,
        planned_end_date: type?.rowData?.planned_end_date,
        target_value: type?.rowData?.target_value || "100",
        update_interval: type?.rowData?.update_interval || "quarterly",
        on_day: type?.rowData?.on_day?.toString(),
        group_by: type?.rowData?.group_by || "document",
        max_updates: "target",
        min: type?.rowData?.min,
        max: type?.rowData?.max?.toString(),
        oid: type?.rowData?.oid?.toString(),
        value: type?.rowData?.value?.toString(),
    })

    const generatePlanningPoints = async () => {
        await axios.post(`${rootUrl}/ObjectiveServlet?action=plan_points&arg=kpi`,
            initialPoints
        )
            .then(function (response) {
                setGeneratedPoints(response.data.data[0].planned_values)
            })
            .catch((err) => {
                console.log("error", err)
            })
    }
  
    const modifiedPoints = generatedPoints.map(point => (
        {
            ...point,
            kpi_id: type?.rowData?.id?.toString(),
            obj_id: type?.rowData?.oid?.toString()
        }
    ))

    const [formattedKpi, setFormattedKpi] = useState({
        title: type?.rowData?.title,
        description: type?.rowData?.description,
        source: "manual",
        default_target_value: "100",
        measure_unit: "velocity",
        id: type?.rowData?.id?.toString(),
        indicator_type: type?.rowData?.indicator_type,
        quant_weight: type?.rowData?.quant_weight?.toString(),
        qual_weight: type?.rowData?.qual_weight,
        planned_start_date: type?.rowData?.planned_start_date,
        planned_end_date: type?.rowData?.planned_end_date,
        update_interval: type?.rowData?.update_interval || "quarterly",
        group_by:type?.rowData?.group_by || "document",
        max_updates: type?.rowData?.max_updates || "target",
        performance_function: "average",
        owner: "amaiello",
        target_value: type?.rowData?.target_value?.toString() || "100",
        on_day: type?.rowData?.on_day,
        min: type?.rowData?.min?.toString(),
        max: type?.rowData?.max?.toString(),
        oid: type?.rowData?.oid?.toString(),
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
        planned_values: modifiedPoints,
    })
   
    const handleKPIPlanning = async (e) => {
        e.preventDefault();
        const updatedFormattedKpi = {
            ...formattedKpi,
            planned_values: modifiedPoints
        };
        await axios.post(`/ObjectiveServlet?action=update&arg=kpi&arg1=${type?.rowData?.oid}`,
            updatedFormattedKpi
        )
            .then(function (response) {
                getSpreadsheetTable()
                setPlanToolShow(false)
                setToastShow(true)
                setNewDateFlag(true)
                
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleCheckboxChange = (event) => {
        setOverwriteChecked(event.target.checked);
        if (event.target.checked) {
            setGeneratedPoints([]);
        }
    };
    const handleRoundValueChange = (event) => {
        setRoundValues(!roundValues);
      };

    useEffect(() => {
        if (initialPoints.update_interval === "overwrite") {
            setGeneratedPoints([])
        }
    }, [initialPoints]);

    const datePostpone = (planned_date, val) => {
        let dat = dayjs(planned_date).format('DD/MM/YY');
        return new Date(new Date(dat)?.setMonth(new Date(dat).getMonth() + val));
    }

    const handleDeleteClick = (index) => {
        const updatedPoints = [...generatedPoints];
        updatedPoints.splice(index, 1);
        setGeneratedPoints(updatedPoints);
    };
    
    function convertUnixTimestampToDateString(unixTimestamp) {
        if (!unixTimestamp) return '';
        const dateObject = new Date(parseInt(unixTimestamp));
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <>
            <Modal show={planToolShow} onHide={() => setPlanToolShow(false)} size="lg">
                <Modal.Header closeButton>
                    <div className='planning-tool-header'>
                        <div header-flex>Planning Tool</div>
                        <div className='subheader-flex'>KPI : {type?.rowData?.title}</div>
                    </div>
                </Modal.Header>
                <ModalBody>
                    <Form onSubmit={handleKPIPlanning}>
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mx-3 " controlId="formGridEmail">
                                <Form.Label className='font-size-16px'>Total Target</Form.Label>
                                <Form.Control className='font-size-16px' type="text" placeholder=" Total Target" defaultValue={type?.rowData?.target_value || "100"}
                                    onChange={(event) => {
                                        setInitialPoints((prev) => ({ ...prev, target_value: event.target.value }))
                                        setFormattedKpi((prev) => ({ ...prev, target_value: event.target.value }))
                                        generatePlanningPoints()
                                    }}
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mx-3" controlId="formGridPassword">
                                <Form.Label className='font-size-16px'>Group by</Form.Label>
                                <Form.Select aria-label="Default select example"
                                    defaultValue={type?.rowData?.group_by ? type?.rowData?.group_by : "document"}
                                    className='font-size-16px'
                                    onChange={(event) => {
                                        setInitialPoints((prev) => ({ ...prev, group_by: event.target.value }))
                                        setFormattedKpi((prev) => ({ ...prev, group_by: event.target.value }))
                                        generatePlanningPoints()
                                    }}
                                >
                                    <option className='font-size-16px' value="document">Documented Default(avg)</option>
                                    <option className='font-size-16px' value="accumulated">Accumulated</option>
                                    <option className='font-size-16px' value="sum">Sum by Update Interval</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} className=" mx-3" controlId="formGridEmail">
                                <Form.Label className='font-size-16px'>Start Date</Form.Label>
                                <Form.Control className='font-size-16px' type="date" placeholder="Enter email"
                                     defaultValue={convertUnixTimestampToDateString(type?.rowData?.planned_start_date)}
                                    onChange={(e) => {
                                        const selectedDate = e.target.value;
                                        const dateObject = new Date(selectedDate)
                                        const unixTimeStamp = dateObject.getTime().toString()
                                        setInitialPoints((prev) => ({ ...prev, planned_start_date: unixTimeStamp }))
                                        setFormattedKpi((prev) => ({ ...prev, planned_start_date: unixTimeStamp }))
                                        generatePlanningPoints()
                                    }}
                                />
                            </Form.Group>

                            <Form.Group as={Col} className=" mx-3" controlId="formGridPassword">
                                <Form.Label className='font-size-16px'>End Date</Form.Label>

                                <Form.Control className='font-size-16px' type="date" placeholder="Password"
                                       defaultValue={convertUnixTimestampToDateString(type?.rowData?.planned_end_date)}
                                    min={
                                        type?.rowData?.update_interval === undefined ?
                                            datePostpone(type?.rowData?.planned_start_date, 1) :
                                            type?.rowData?.update_interval === "monthly" ?
                                                datePostpone(type?.rowData?.planned_start_date, 1) :
                                                type?.rowData?.update_interval === "quarterly" ?
                                                    datePostpone(type?.rowData?.planned_start_date, 3) :
                                                    type?.rowData?.update_interval === "half" ?
                                                        datePostpone(type?.rowData?.planned_start_date, 6) :
                                                        datePostpone(type?.rowData?.planned_start_date, 1)
                                    }
                                    onChange={(event) => {
                                        const selectedDate = event.target.value;
                                        const dateObject = new Date(selectedDate)
                                        const unixTimeStamp = dateObject?.getTime().toString()
                                        setInitialPoints((prev) => ({ ...prev, planned_end_date: unixTimeStamp }))
                                        setFormattedKpi((prev) => ({ ...prev, planned_end_date: unixTimeStamp }))
                                        generatePlanningPoints()
                                    }}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-5">
                            <Form.Group as={Col} className=" mx-3" controlId="formGridEmail">
                                <Form.Label className='font-size-16px'>Update Interval</Form.Label>
                                <Form.Select className='font-size-16px' aria-label="Default select example"
                                    defaultValue={type?.rowData?.update_interval? type?.rowData?.update_interval : "quarterly"}
                                    onChange={(event) => {
                                        setInitialPoints((prev) => ({ ...prev, update_interval: event.target.value }))
                                        setFormattedKpi((prev) => ({ ...prev, update_interval: event.target.value }))
                                        generatePlanningPoints()
                                    }}
                                >
                                    <option className='font-size-16px' value="monthly">1st of EVERY Month</option>
                                    <option className='font-size-16px' value="quarterly">1st Every Quarter</option>
                                    <option className='font-size-16px' value="half">1st Every Six Months</option>
                                    <option className='font-size-16px' value="overwrite">Overwrite existing values</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} className=" mx-3" controlId="formGridPassword">
                                <Form.Label className='font-size-16px'>Max Updates</Form.Label>
                                <Form.Select className='font-size-16px' aria-label="Default select example" defaultValue={type?.rowData?.max_updates || "target"}
                                    onChange={(event) => {
                                        setInitialPoints((prev) => ({ ...prev, max_updates: event.target.value }))
                                        setFormattedKpi((prev) => ({ ...prev, max_updates: event.target.value }))
                                        generatePlanningPoints()
                                    }}
                                >
                                    <option className='font-size-16px' value="target">Target Value</option>
                                    <option className='font-size-16px' value="target_plus_5">Target plus 5%</option>
                                    <option className='font-size-16px' value="target_plus_25">Target plus 25%</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="mb-4">
                            <Form.Group as={Col} className=" mx-3" controlId="formGridEmail">
                                <Form.Group className="mb-3" id="formGridCheckbox">
                                    <Form.Check className='font-size-16px' type="checkbox" label="Overwrite existing values" checked={overwriteChecked}
                                        onChange={handleCheckboxChange} />
                                </Form.Group>
                            </Form.Group>

                            <Form.Group as={Col} className=" mx-3" controlId="formGridPassword">
                                <Form.Group className="mb-3" id="formGridCheckbox">
                                    <Form.Check
                                        className='font-size-16px'
                                        type="checkbox"
                                        label="Round value"
                                        checked={roundValues}
                                        onChange={handleRoundValueChange}
                                    />
                                </Form.Group>
                            </Form.Group>
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
                                        generatedPoints.map((point, index) => {
                                            const dateString = point.point_date;
                                            const timestamp = parseFloat(dateString.replace(/[^0-9]/g, ''));
                                            const formattedDate = dayjs(timestamp).format('MM/DD/YY');
                                            return (
                                                <TableRow
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" >
                                                        {formattedDate}
                                                    </TableCell>
                                                    <TableCell align="right">{point.min}</TableCell>
                                                    <TableCell align="right">{point.baseline}</TableCell>
                                                    <TableCell align="right">{roundValues? point?.value?.toFixed(0) : point?.value?.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{roundValues? point?.target?.toFixed(0) : point?.target?.toFixed(2)}</TableCell>
                                                    <TableCell align="right">{roundValues? point?.max.toFixed(0) :point?.max?.toFixed(2)}</TableCell>
                                                    <TableCell align="right">  <img alt="" src="/images/scorecard/spreadsheets/table-icons/garbagebin.svg" onClick={() => handleDeleteClick(index)} /></TableCell>
                                                </TableRow>
                                            )
                                        }
                                        )
                                    }

                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Modal.Footer>
                            <Button variant="secondary"  >
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
                        Planning Points Created Successfully
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}

export default PlanningTool