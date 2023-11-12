import React, { useContext, useState } from 'react';
import { TableCell, TableRow, IconButton, TextField, Table, TableBody, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from 'axios';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import EditGoal from '../../SheetActions/EditGoal/EditGoal';
import { rootUrl } from '../../../../../Constants';
import { useAutosave } from 'react-autosave';
import KPI from '../KPI/KPI';
import Actions from '../Actions/Actions';


const Goals = ({ per, index, ind, handleRowClick, setIndex, spreadsheet }) => {
    const { getSpreadsheetTable, getGoalComments, type, setType } = useContext(SpreadsheetContext);
    const [edit, setEdit] = useState({
        index: -1,
        ind: -1
    })
    const [editGoalShow, setEditGoalShow] = useState(false);
    const [goal, setGoal] = useState({
        title: "",
        description: "",
        row: "",
        theme: "",
        id: ""
    });
    async function handleEditGoal() {
        await axios.post(`${rootUrl}/ObjectiveServlet?action=update&arg=obj`, {
            title: goal.title ? goal.title : per?.title,
            description: goal.description ? goal.description : per?.description,
            row: goal.row ? goal.row : per?.row,
            theme: per.theme,
            id: per?.id
        })
            .then(function (response) {
                setEdit((prev) => ({ ...prev, index: index, item: false }));
                getSpreadsheetTable();
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const handleExit = () => {
        setEdit({ index: -1, ind: -1 })
    }
    const handleEditGoalHide = () => setEditGoalShow(false);
    useAutosave({ data: goal, onSave: handleEditGoal, saveOnUnmount: false });
    return (
        <>
            <TableRow
                key={index}
                sx={{
                    width:"100%",
                    '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" },
                }}
                onMouseLeave={() => handleExit()}
                onClick={() => { setType((prev) => ({ ...prev, name: "goal", id: per.id, rowData: per }));}}
                selected={type.name === "goal" && type.id === per.id}
                onContextMenu={(e) => { e.preventDefault(); getGoalComments(per.id); handleRowClick(e); setType((prev) => ({ ...prev, name: "goal", id: per.id, rowData:per })) }}
            >
                <TableCell padding='none' sx={{ width:"30%",paddingLeft:(per?.kpis.length===0||per?.tasks?.length===0)?"5%":"2.22%"}} size="large">
                    {
                        per?.kpis.length === 0 && per?.tasks.length === 0 ? <></> : <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => { setIndex((prev) => ({ ...prev, goal: ind.goal === index ? -1 : index })) }}
                        >
                            {index === ind.goal ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    }

                    <img alt="_" src="/images/scorecard/spreadsheets/table-actions/goal.svg" style={{ marginLeft: "2px", marginRight: "4px" }} />
                    {
                        edit.index === index && edit.ind === 0 ?
                            <TextField id="standard-basic" variant="standard" onBlur={handleExit} onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleExit()
                                }
                            }
                            } defaultValue={per.title}

                                onChange={(e) => {
                                    if (e.target.value !== "") {
                                        setGoal((prev) => ({ ...prev, title: e.target.value }))
                                    }
                                }
                                } /> :
                            <span style={{ paddingLeft: 1 }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                {per.title ? per.title : per.title}
                            </span>
                    }
                </TableCell>
                <TableCell align="center" sx={{ width:"10%"}}>{}
                    <img alt="_" src="/images/scorecard/spreadsheets/table-icons/edit.svg" style={{ cursor: "pointer" }} onClick={() => {setEditGoalShow(true);  getGoalComments(per.id); }} />
                </TableCell>
                {
                    spreadsheet === "Progress" ?
                        <TableCell align="center" sx={{ width:"10%"}}>
                            {
                                per.weight ? Number(per.weight).toFixed(2) : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.measure ? Number(per.measure).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.budget ? Number(per.budget) : "_"
                                        }
                                    </TableCell>
                            }
                        </>
                }

                {
                    spreadsheet === "Progress" ?
                        <TableCell align="center" sx={{ width:"10%"}}>
                            {
                                per.measure ? Number(per.measure).toFixed(2) : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center"sx={{ width:"10%"}} >
                                        {

                                            per.value ? Number(per.value).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {

                                            per.actual ? Number(per.actual).toFixed(2) : "_"
                                        }
                                    </TableCell>
                            }
                        </>
                }
                {
                    spreadsheet === "Progress" ?
                        <TableCell align="center" sx={{ width:"10%"}}>
                            {
                                per.baseline ? Number(per.baseline).toFixed(2) : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.weight ? Number(per.weight).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.variance ? Number(per.variance).toFixed(2) : "_"
                                        }
                                    </TableCell>
                            }
                        </>
                }
                {
                    spreadsheet === "Progress" ?
                        <TableCell align="center" sx={{ width:"10%"}}>
                            {

                                per.value ? Number(per.value).toFixed(2) : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.min ? Number(per.min).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.percent_used ? Number(per.percent_used).toFixed(2) : "_"
                                        }
                                    </TableCell>
                            }
                        </>
                }
                {
                    spreadsheet === "Progress" ?
                        <TableCell align="center" sx={{ width:"10%"}}>
                            {
                                per?.target_value ? Number(per?.target_value).toFixed(2) : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.max ? Number(per.max).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.percent_remaining ? Number(per.percent_remaining).toFixed(2) : "_"
                                        }
                                    </TableCell>
                            }
                        </>
                }
                {
                    spreadsheet === "Progress" ?
                        <TableCell align="right" sx={{ width:"10%"}}>
                            {
                                per.progress ? `${Number(per.progress).toFixed(2)}%` : "_"
                            }
                        </TableCell> :
                        <>
                            {
                                spreadsheet === "Performance" ?
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {
                                            per.performance ? Number(per.performance).toFixed(2) : "_"
                                        }
                                    </TableCell> :
                                    <TableCell align="center" sx={{ width:"10%"}}>
                                        {"_"}
                                    </TableCell>
                            }
                        </>
                }

            </TableRow>
            <TableRow>
                <TableCell style={{ padding: 0 }}  colSpan={8}>
                    <Collapse in={index === ind.goal} timeout="auto" unmountOnExit>
                        <Table aria-label="purchases" sx={{ width: "100%" }} hover={false}>
                            <TableBody>
                            {(per?.kpis.length===0 || spreadsheet === "Budget")?<></>:
                            <>
                            {per?.kpis?.filter((kp,i,arr) => kp?.delete_flag === 0 && arr.map((ele) => ele.title).indexOf(kp.title === i))?.map((kp, indKpi) => (
                            <KPI
                                kp={kp}
                                handleRowClick={handleRowClick}
                                index={indKpi}
                                spreadsheet={spreadsheet}
                            />
                             ))
                            }
                            </>
                            }
                            {
                                (per?.tasks?.length===0|| spreadsheet === "Performance")?<></>:
                                <>
                                {
                                    per?.tasks?.filter((task, i, arr) => arr.map((ele) => ele.title).indexOf(task.title === i))?.map((act, index) => (
                                        <Actions
                                        act={act}
                                        handleRowClick={handleRowClick}
                                        index={index}
                                        spreadsheet={spreadsheet}
                                    />
                                        ))
                                 }
                                </>
                            }
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
            <EditGoal EditGoalShow={editGoalShow} handleEditGoalHide={handleEditGoalHide} goalData={type.rowData} />
        </>
    )
}

export default React.memo(Goals);