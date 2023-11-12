import React, { useState, useContext } from 'react'
import "./BudgetComponents.css";
import BottomTabs from '../BottomTabs/AllTabs/AllTabs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, TextField } from '@mui/material';
import SheetActions from "../SheetActions/SheetActions"
import { SpreadsheetContext } from '../../../../context/SpreadsheetContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { BudgetComponent } from '../../../../utils/spreadsheet';
import DeleteItem from '../SheetActions/DeleteItem/DeleteItem';
import axios from 'axios';
import Goals from '../ProgressComponents/Goals/Goals';
import { rootUrl } from '../../../../Constants';
import { useAutosave } from 'react-autosave';
import AddItem from '../SheetActions/AddItem/AddItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BudgetComponents = ({ spreadsheet }) => {
    //handle menu popover
    const { goals, type, setType, tableData, getSpreadsheetTable } = useContext(SpreadsheetContext);
    const [date, setDate] = useState({
        month:getMonthName(new Date().getMonth()),
        year:new Date().getFullYear()
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open,setOpen]=useState({
        bool:false,
        past:false,
        future:false
    });
    const showAddItem = Boolean(anchorEl);
    const [addItemShow, setAddItemShow] = useState(false);
    const [collapse, setCollapse] = useState(false);
    const [del, setDelete] = useState(false);
    const [edit, setEdit] = useState({
        index: -1,
        ind: -1
    });
    const [ind, setIndex] = useState({
        per: 0,
        goal: 0
    });
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
    const handleRowClick = (event) => {
        setIsMenuOpen(true);
        setAnchorEl(event.currentTarget);
    }
    const handlePerspective = (perspective) => {
        switch (perspective) {
            case "Financial": { return "4px solid var(--indigo-300, #A370F7)"; }
            case "Customer Needs": { return "4px solid var(--orange-400, #FD9843)"; }
            case "Internal Processes": { return "4px solid var(--pink-400, #DE5C9D)"; }
            case "Growth and Training": { return "4px solid var(--cyan-500, #0DCAF0)"; }
            default: { return "4px solid red"; }
        }
    }
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
      
        return date.toLocaleString('en-US', {
          month: 'short',
        });
      }
    const handleAddItemHide = () => setAddItemShow(false);
    const editPerspective = async () => {
        await axios.post(`${rootUrl}/ObjectiveServlet?action=update_perspective`, {
            record_id: type?.id,
            analysis_type: 4,
            name: pers.display_name ? pers.display_name?.toLowerCase() : type?.rowData?.name,
            description: pers.question ? pers.question : type?.rowData?.question,
            question: pers.question ? pers.question : type?.rowData?.question,
            color: type.rowData.color,
            display_name: pers.display_name ? pers.display_name : type?.rowData?.display_name,
            company_id: 1
        })
            .then(function (response) {
                getSpreadsheetTable();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useAutosave({ data: pers, onSave: editPerspective, saveOnUnmount: false });
    return (
        <div style={{ width: "100%", height: "100%" }} >
        <div className='tables-elements-header'>
        <div className='header-titles'>
            <div className='title-style'>BSC Budget Spreadsheet</div>
            <div className='subtitle-style'>Proposition: change the way we sell to customers and align internally to support hybrid needs </div>
        </div>
        <div className='header-actions'>
        <div className="button-group">
            <div className="left-arrow" onClick={()=>setOpen((prev)=> ({...prev,bool:!prev.bool,future:true}))}>
                <div>
                    <ChevronLeftIcon />
                </div>
            </div>
            <div className="center-btn">
            {
                open.bool?
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker  
                views={['month', 'year']}
                onClose={()=>setOpen({
                    bool:false,
                    past:false,
                    future:false
                })}
                open={open.bool}
                onYearChange={(e)=>  setDate((prev)=> ({...prev,year:e.$y}))}
                onMonthChange={(e)=> setDate((prev)=> ({...prev,month:getMonthName(e.$M)})) }
                disableFuture={open.future}
                disablePast={open.past}
                />
                </LocalizationProvider>:
                <div className="cal">
                <div className='cal-text'>
                   {date?.month} {date?.year}
                </div>
              </div>
            }
           
               
            </div>
            <div className="right-arrow" onClick={()=>setOpen((prev)=> ({...prev,bool:!prev.bool,past:true}))}>
                <div>
                    <ChevronRightIcon />
                </div>

            </div>
        </div>
        <div onClick={(e) => {
            if (goals?.length === 0) {
                setAddItemShow(true);
                setType({ name: "scorecard", id: tableData.id, rowData: tableData })
            }
            else {
                setIsMenuOpen(true); setAnchorEl(e.currentTarget);
            }
        }} style={{ cursor: "pointer" }}>
            <img alt="" src="/images/scorecard/spreadsheets/table-icons/plus.svg" />
        </div>
        <IconButton disabled={type.id===""||type.name===""} onClick={() => setDelete(true)} style={{ cursor: "pointer" }}>
            <img alt="" src="/images/scorecard/spreadsheets/table-icons/garbagebin.svg" />
        </IconButton>
    </div>
    </div>
            <div className="table-header" style={{ height: collapse ? "790px" : "561px" }}>
                <Paper sx={{ width: '100%', overflow: 'hidden', height: "100%" }}>
                    <TableContainer component={Paper} sx={{
                        maxHeight: '100%',
                        "& .MuiTableRow-root:hover": {
                            backgroundColor: "#ebeef2",
                            cursor: 'pointer'
                        }
                    }}>
                        <Table stickyHeader aria-label="collapsible table" sx={{ height: "100%" }}>
                            <TableHead>
                                <TableRow hover={false}>
                                    {
                                        BudgetComponent.map((per, index) => (
                                            <TableCell align={per === "Budget" && index === 0 ? 
                                            "left":
                                            index === BudgetComponent.length-1 ? "right"
                                            : "center"
                                            } key={index} sx={{ color: "var(--text-secondary, #6C757D)", fontFamily: "Figtree", fontSize: "12px", fontWeight: "600", lineHeight: "150%" }}>{per}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    sx={{
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#ffffbf" }
                                    }}
                                    selected={type.name === "scorecard" && type.id === tableData.id}

                                    onClick={() => { setType({ name: "scorecard", id: tableData.id, rowData: tableData }) }}
                                    onContextMenu={(e) => { e.preventDefault(); setType({ name: "scorecard", id: tableData.id, rowData: tableData }); handleRowClick(e); }}
                                >

                                    <TableCell size="large" sx={{ color: "var(--text-primary, #212529)", fontFamily: "Figtree", fontSize: "16px", fontWeight: "600", lineHeight: "150%" }}>
                                        <img src="/images/scoreStrategyMap.svg" alt="" style={{ width: "24px", height: "24px" }} /> <span style={{ paddingLeft: "8px" }}>{tableData?.name}</span>
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell  align="center">{tableData?.budget}</TableCell>
                                    <TableCell  align="center">{tableData?.actual}</TableCell>
                                    <TableCell  align="center">{"_"}</TableCell>
                                    <TableCell  align="center">{"_"}</TableCell>
                                    <TableCell  align="center">{"_"}</TableCell>
                                    <TableCell  align="right">{"_"}</TableCell>
                                </TableRow>
                                {
                                    tableData?.perspectives?.map((per, index) => (
                                        <React.Fragment>
                                            <TableRow key={index}
                                                sx={{
                                                    '& > *': { borderBottom: 'unset' },
                                                    '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" },
                                                    
                                                }}
                                                selected={type.name === "perspective" && type.id === per.id}
                                                onClick={() => setType({ name: "perspective", id: per.id, rowData: per })}
                                                onContextMenu={(e) => { e.preventDefault(); setType({ name: "perspective", id: per.id, rowData: per }); handleRowClick(e); }}
                                                onMouseLeave={() => setEdit({ index: -1, ind: -1 })}
                                            >
                                                <TableCell  size='large' sx={{ color: "var(--text-primary, #212529)",borderLeft:`4px solid ${per.color}`, fontFamily: "Figtree", fontSize: "16px", fontWeight: "600", lineHeight: "150%", display: "flex", alignItems: "center" }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => { setIndex((prev) => ({ ...prev, per: ind.per === index ? -1 : index })); }}
                                                    >
                                                        {index === ind.per ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                    {
                                                        edit.index === index  && edit.ind === 0 ?
                                                            <TextField id="standard-basic" variant="standard" defaultValue={per.display_name}
                                                                onBlur={() => setEdit({ index: -1, ind: -1 })} onKeyDown={(e) => {
                                                                    if (e.key === "Enter")
                                                                        setEdit({ index: -1, ind: -1 })
                                                                }

                                                                }
                                                                onChange={(e) => {
                                                                    if (e.target.value !== "") {
                                                                        setPerspective((prev) => ({
                                                                            ...prev,
                                                                            display_name: e.target.value ? e.target.value : per.display_name
                                                                        }))
                                                                    }
                                                                }
                                                                } /> :
                                                            <span style={{ paddingLeft: "8px" }} onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                                                {per.display_name}
                                                            </span>
                                                    }
                                                </TableCell>
                                                <TableCell></TableCell>
                                                <TableCell  align="center" sx={{ width: "10%" }}>
                                                    {
                                                        per.budget
                                                    }
                                                </TableCell>
                                                <TableCell  align="center" sx={{ width: "10%" }}>
                                                    {
                                                        per.actual
                                                    }</TableCell>
                                                <TableCell  align="center" sx={{ width: "10%" }}>
                                                    {
                                                        "_"
                                                    }
                                                </TableCell>
                                                <TableCell  align="center" sx={{ width: "10%" }}>
                                                    {
                                                        "_"
                                                    }
                                                </TableCell>
                                                <TableCell  align="center" sx={{ width: "10%" }}>
                                                    {
                                                        "_"
                                                    }
                                                </TableCell>
                                                <TableCell  align="right" sx={{ width: "10%" }}>
                                                    {
                                                        "_"
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell  style={{ padding: 0 }} colSpan={8}>
                                                    <Collapse in={index === ind.per} timeout="auto" unmountOnExit>
                                                        <Table aria-label="purchases" sx={{ width: "100%" }}>
                                                            <TableBody>
                                                           
                                                                    {
                                                                        per?.objectives?.filter((goal, i, arr) => goal?.row?.toLowerCase() === per.display_name?.toLowerCase() && arr.map((ele) => ele.id).indexOf(goal.id) === i).map((per, index) => (
                                                                        
                                                                                <Goals
                                                                                    per={per}
                                                                                    index={index}

                                                                                    ind={ind}
                                                                                    handleRowClick={handleRowClick}
                                                                                    setIndex={setIndex}
                                                                                    spreadsheet={spreadsheet}
                                                                                />
                                                                             
                                                                       
                                                                        )
                                                                        )
                                                                    }
                                                    
                                                            </TableBody>
                                                        </Table>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {isMenuOpen && (
                        <SheetActions
                            anchorEl={anchorEl}
                            open={showAddItem}
                            setAnchorEl={setAnchorEl}

                        />
                    )}
                </Paper>
                <div className="downIcon" onClick={() => setCollapse(!collapse)}>
                    <img
                        src="/images/Collapsebutton.svg"
                        alt="collapse"
                        style={{ transform: collapse ? "rotate(-90deg)" : "rotate(90deg)" }}
                    />
                </div>
            </div>
            <div className='progress-bottom' style={{ display: collapse ? "none" : "block" }}>
                <BottomTabs />
            </div>
            <DeleteItem del={del} setDelete={setDelete} />
            <AddItem AddItemShow={addItemShow} handleAddItemHide={handleAddItemHide} />
        </div>
    )
}

export default BudgetComponents;