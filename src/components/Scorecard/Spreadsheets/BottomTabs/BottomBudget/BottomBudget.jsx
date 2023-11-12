import React, { useContext, useState } from 'react'
import { BudgetComponent } from '../../../../../utils/spreadsheet';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import EditGoal from '../../SheetActions/EditGoal/EditGoal';
import EditKPI from '../../SheetActions/EditKPI/EditKPI';
import EditAction from '../../SheetActions/EditAction/EditAction';


const BottomBudget = () => {
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
                                    BudgetComponent.map((per, index) => (
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
                                <TableCell><img alt="" src="/images/scorecard/spreadsheets/table-icons/edit.svg"
                                    onClick={() => {
                                        if (type.name === "goal") {
                                            setEditGoalShow(true);
                                        } else if (type.name === "kpi") {
                                            setEditKPIShow(true);
                                        } else if (type.name === "action") {
                                            setEditActionShow(true);
                                        }
                                    }}
                                /></TableCell>
                                <TableCell>{type.rowData?.budget}</TableCell>
                                <TableCell>{type.rowData?.actual}</TableCell>
                                <TableCell>_</TableCell>
                                <TableCell>{type.rowData?.percent_complete}</TableCell>
                                <TableCell>_</TableCell>
                                <TableCell>_</TableCell>
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

export default BottomBudget
