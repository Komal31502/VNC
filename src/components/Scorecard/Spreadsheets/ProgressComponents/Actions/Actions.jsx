import React, { useContext, useState } from 'react'
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import { TableCell, TableRow, TextField } from '@mui/material';
import EditAction from '../../SheetActions/EditAction/EditAction';
import { useAutosave } from 'react-autosave';
import axios from 'axios';
import { rootUrl } from '../../../../../Constants';

const Actions = ({ index, handleRowClick, act, spreadsheet }) => {
    const { getActionComments, type, setType, getSpreadsheetTable } = useContext(SpreadsheetContext);
    const [edit, setEdit] = useState({
        index: -1,
        ind: -1
    })
    const [editActionShow, setEditActionShow] = useState(false);
    const handleEditActionHide = () => setEditActionShow(false);
    const [action, setAction] = useState({});
    const iconType = (icon) => {
        switch (icon) {
            case "KPI": { return "/images/scorecard/spreadsheets/table-icons/KPI.svg"; }
            case "Action": { return "/images/scorecard/spreadsheets/table-icons/task.svg"; }
            case "Success Factor": { return "/images/scorecard/spreadsheets/table-icons/success.svg"; }
            case "Expected Outcome": { return "/images/scorecard/spreadsheets/table-icons/expected.svg"; }
            case "Rationale": { return "/images/scorecard/spreadsheets/table-icons/task.svg"; }
            case "Hypothesis": { return "/images/scorecard/spreadsheets/table-icons/hypothesis.svg"; }
            case "Risk": { return "/images/scorecard/spreadsheets/table-icons/risk-factor.svg"; }
            case "Cascaded": { return "/images/scorecard/spreadsheets/table-icons/rectangle.svg"; }
            case "Linked": { return "/images/scorecard/spreadsheets/table-icons/link-icon.svg"; }
            case "Dependency": { return "/images/scorecard/spreadsheets/table-icons/dependency.svg"; }
            case "Reasoning": { return "/images/scorecard/spreadsheets/table-icons/reasoning.svg"; }
            default: { break; }
        }
    }
    const handleExit = () => {
        setEdit({ index: -1, ind: -1 })
    }
    const handleAction = async (data) => {
        await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=task&arg1=${type?.rowData?.oid}`,
            {
                ID: type?.id,
                owner: type?.rowData.created_by,
                title: data.title ? data.title : type?.rowData.title,
                description: type?.rowData.description,
                percent_complete: data.percent_complete ? data.percent_complete : type?.rowData.percent_complete,
                type: type?.rowData.type,
                status: type?.rowData.status,
                timeline: type?.rowData.timeline,
                budget: data.budget ? data.budget : type?.rowData.budget,
                date_complete: type?.rowData.actual_end_date,
                scheduled_completion: type?.rowData.actual_end_date,
                actual_start_date: type?.rowData.actual_start_date,
                planned_start_date: type?.rowData.planned_start_date,
                planned_end_date: type?.rowData.planned_end_date,
                quant_weight: data.quant_weight ? data.quant_weight : type?.rowData.quant_weight,
                qual_weight: type?.rowData.qual_weight,
                forecast_date: type?.rowData.forecast_date
            }
        )
            .then((res) => {
                getSpreadsheetTable();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    useAutosave({ data: action, onSave: handleAction, saveOnUnmount: false });
    return (
        <>


            <TableRow key={index}
                sx={{
                    '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" }
                }}
                onMouseLeave={() => handleExit()}
                selected={type.name === "action" && type.id === act.id}
                onClick={() => { setType((prev) => ({ ...prev, name: "action", id: act.id, rowData: act }));  }}
                onContextMenu={(e) => { e.preventDefault(); setType((prev) => ({ ...prev, name: "action", id: act.id, rowData: act })); getActionComments(act.id); handleRowClick(e); }}>
                {
                    spreadsheet === "Progress" ?
                        <>
                            <TableCell padding='none' sx={{ width:"30%",paddingLeft:"7%"}} size="large" onMouseLeave={() => handleExit()}>
                                <img alt="" src={iconType(act.type)} style={{ marginRight: "4px" }} />
                                {
                                    edit.index === index && edit.ind === 0 ?
                                        <TextField onBlur={() => handleExit()} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleExit()
                                            }
                                        }
                                        } id="standard-basic" variant="standard" defaultValue={act.title} onChange={(e) => {
                                            if (e.target.value !== "") {
                                                setAction((prev) => ({ ...prev, title: e.target.value }))
                                            }
                                        }
                                        } /> :
                                        <span style={{ paddingLeft: "8px" }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                            {act.title}
                                        </span>
                                }
                            </TableCell>

                            <TableCell align='center'  sx={{width:"10%"}}>
                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg" onClick={() => {getActionComments(act.id); setEditActionShow(true)}} />
                            </TableCell>

                            <TableCell align='center'  sx={{width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 1 }))}>
                                {
                                    edit.index === index && edit.ind === 1 ?
                                        <TextField onBlur={() => handleExit()} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleExit()
                                            }
                                        }
                                        } size="small" id="standard-basic" variant="standard" type='number' onChange={(e) => setAction((prev) => ({ ...prev, quant_weight: e.target.value }))} /> :
                                        act.weight
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}} >

                                {
                                    act.measure
                                }</TableCell>
                            <TableCell align='center'  sx={{width:"10%"}} >
                                {

                                    act.baseline
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {
                                    act.value
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {"_"}
                            </TableCell>
                            <TableCell align="right">
                                {
                                    
                                    `${Number.isInteger(act?.progress)?Number(act?.progress):Number(act?.progress).toFixed(2)}`
                                }
                            </TableCell>
                        </> :


                        <>
                            <TableCell padding='none' sx={{ width:"30%",paddingLeft:"7%"}} size="large" onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                <img alt="" src={iconType(act.type)} style={{ marginRight: "4px" }} />
                                {
                                    edit.index === index && edit.ind === 0 ?
                                        <TextField onBlur={() => handleExit()} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleExit()
                                            }
                                        }
                                        } id="standard-basic" variant="standard" defaultValue={act.title} onChange={(e) => setAction((prev) => ({ ...prev, title: e.target.value }))} /> :
                                        <span style={{ paddingLeft: "8px" }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                            {act.title ? act.title : action.title}
                                        </span>
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                <img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg" style={{ cursor: "pointer" }} onClick={() => setEditActionShow(true)} />
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 1 }))}>
                                {
                                    edit.index === index && edit.ind === 1 ?
                                        <TextField onBlur={() => handleExit()} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleExit()
                                            }
                                        }
                                        } size="small" id="standard-basic" variant="standard" type='number' onChange={(e) => {
                                            if (e.target.value !== "")
                                                setAction((prev) => ({ ...prev, budget: e.target.value }))
                                        }
                                        } /> :
                                        `${Number.isInteger( act?.budget)?Number( act?.budget):Number(act?.budget).toFixed(2)}`
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {
                                    act.actual
                                }</TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {

                                    "_"
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 4 }))}>
                                {
                                    edit.index === index && edit.ind === 4 ?
                                        <TextField onBlur={() => handleExit()} onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleExit()
                                            }
                                        }
                                        } size="small" id="standard-basic" variant="standard"  onChange={(e) => {
                                            if (e.target.value !== "")
                                                setAction((prev) => ({ ...prev, percent_complete: e.target.value }))
                                        }}

                                        /> :
                                        act.percent_complete
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {

                                    act.percent_remaining ? act.percent_remaining : "_"
                                }
                            </TableCell>
                            <TableCell align='center'  sx={{width:"10%"}}>
                                {"_"}
                            </TableCell>
                        </>


                }


            </TableRow>


            <EditAction EditActionShow={editActionShow} handleEditActionHide={handleEditActionHide} />
        </>
    )
}

export default Actions;