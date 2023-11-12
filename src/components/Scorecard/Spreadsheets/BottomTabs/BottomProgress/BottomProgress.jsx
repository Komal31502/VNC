import React, { useContext, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { ProgressComponents } from '../../../../../utils/spreadsheet';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import EditGoal from '../../SheetActions/EditGoal/EditGoal';
import EditKPI from '../../SheetActions/EditKPI/EditKPI';
import EditAction from '../../SheetActions/EditAction/EditAction';


const BottomProgress = () => {
    const { type } = useContext(SpreadsheetContext);
    const [editGoalShow, setEditGoalShow] = useState(false);
    const [editKPIShow, setEditKPIShow] = useState(false);
    const handleEditGoalHide = () => setEditGoalShow(false);
    const handleEditKPIHide = () => setEditKPIShow(false);
    const [editActionShow, setEditActionShow] = useState(false);
    const handleEditActionHide = () => setEditActionShow(false);

    return (
        <div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{
                    maxHeight: 510,
                    "& .MuiTableRow-root:hover": {
                        backgroundColor: "#ebeef2",
                        cursor: 'pointer'
                    }
                }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow hover>
                                {
                                    ProgressComponents.map((per, index) => (
                                        <TableCell key={index}>{per}</TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody className='tbody-style'>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {type.name === "perspective" ? type?.rowData?.display_name : type?.rowData?.title}
                                </TableCell>
                                <TableCell><img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg" onClick={() => {
                                    if (type.name === "goal") {
                                        setEditGoalShow(true);
                                    } else if (type.name === "kpi") {
                                        setEditKPIShow(true);
                                    } else if (type.name === "action") {
                                        setEditActionShow(true);
                                    }
                                }} style={{ cursor: 'pointer' }} /></TableCell>
                                <TableCell>{type.rowData.quant_weight ? type.rowData.quant_weight : type.rowData.weight}</TableCell>
                                <TableCell>{type.rowData.measure}</TableCell>
                                <TableCell>{type.rowData.baseline}</TableCell>
                                <TableCell>{type.rowData.value}</TableCell>
                                <TableCell>{type.rowData.target_value}</TableCell>
                                <TableCell>{type.rowData.progress ? `${Number(type.rowData.progress).toFixed(2)}%` : "-"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
            <EditGoal EditGoalShow={editGoalShow} handleEditGoalHide={handleEditGoalHide} goalData={type.rowData} />
            <EditKPI EditKPIShow={editKPIShow} handleEditKPIHide={handleEditKPIHide} kpiData={type} />
            <EditAction EditActionShow={editActionShow} handleEditActionHide={handleEditActionHide} type={type} />
        </div>
    )
}

export default BottomProgress
