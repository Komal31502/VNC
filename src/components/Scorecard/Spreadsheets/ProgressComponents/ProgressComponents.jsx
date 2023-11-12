import React, { useContext, useState } from 'react'
import "./ProgressComponents.css";
import BottomTabs from '../BottomTabs/AllTabs/AllTabs'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Collapse, IconButton, TextField, Typography } from '@mui/material';
import SheetActions from "../SheetActions/SheetActions";
import { SpreadsheetContext } from '../../../../context/SpreadsheetContext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProgressComponents } from '../../../../utils/spreadsheet';
import DeleteItem from '../SheetActions/DeleteItem/DeleteItem';
import Goals from './Goals/Goals';
import axios from 'axios';
import { rootUrl } from '../../../../Constants';
import { useAutosave } from 'react-autosave';
import AddItem from '../SheetActions/AddItem/AddItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const ProgressTable = ({ spreadsheet }) => {
    //handle menu popover
    const { goals, type, setType, tableData, getSpreadsheetTable } = useContext(SpreadsheetContext);
    const [date, setDate] = useState({
        month:getMonthName(new Date().getMonth()),
        year:new Date().getFullYear()
    });
    const [addItemShow, setAddItemShow] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open,setOpen]=useState({
        bool:false,
        past:false,
        future:false
    });
    const showAddItem = Boolean(anchorEl)
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
    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber);
      
        return date.toLocaleString('en-US', {
          month: 'short',
        });
      }

    const handleRowClick = (event) => {
        setIsMenuOpen(true);
        setAnchorEl(event.currentTarget);
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
        <div style={{ width: "100%", height: "895px" }}>
            <div className='tables-elements-header'>
                <div className='header-titles'>
                    <div className='title-style'>BSC Progress Spreadsheet</div>
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
                    }} style={{cursor: "pointer"}}>
                        <img alt="" src="/images/scorecard/spreadsheets/table-icons/plus.svg" />
                    </div>
                    <IconButton disabled={type.id===""||type.name===""} onClick={() => setDelete(true)} style={{ cursor: "pointer" }}>
                        <img alt="" src="/images/scorecard/spreadsheets/table-icons/garbagebin.svg" />
                    </IconButton>
                </div>
            </div>
            <div className="table-header" style={{ height: collapse ? "790px" : "561px",  }}>
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
                                        ProgressComponents?.map((per, index) => (
                                            <TableCell align={per === "Progress" && index === 0 ? "left" : index === ProgressComponents.length-1 ? "right" : "center"} key={index} sx={{ color: "var(--text-secondary, #6C757D)", fontFamily: "Figtree", fontSize: "12px", fontWeight: "600", lineHeight: "150%",cursor:"default" }}>{per}</TableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                                <TableBody>
                                    <TableRow
                                        sx={{
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" }
                                        }}
                                        selected={type.name === "scorecard" && type.id === tableData.id}
                                        hover={false}
                                        onClick={(e) => { setType({ name: "scorecard", id: tableData.id, rowData: tableData }) }}
                                        onContextMenu={(e) => { e.preventDefault(); setType({ name: "scorecard", id: tableData.id, rowData: tableData }); handleRowClick(e); }}
                                    >

                                        <TableCell  size="large" sx={{ color: "var(--text-primary, #212529)", fontFamily: "Figtree", fontSize: "16px", fontWeight: "600", lineHeight: "150%" }}>
                                            <img src="/images/scoreStrategyMap.svg" alt="" style={{ width: "24px", height: "24px" }} /> <span style={{ paddingLeft: "8px" }}>{tableData?.name}</span>
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{tableData?.weight}</TableCell>
                                        <TableCell align="center">{tableData?.measure}</TableCell>
                                        <TableCell align="center">{tableData?.baseline}</TableCell>
                                        <TableCell align="center">{tableData?.value}</TableCell>
                                        <TableCell align="center">{"_"}</TableCell>
                                        <TableCell align="right">{tableData?.progress ? `${Number.isInteger(tableData?.progress)?Number(tableData?.progress):Number(tableData?.progress).toFixed(2)}%` : "_"}</TableCell>
                                    </TableRow>
                                    {
                                        tableData?.perspectives?.filter((goal, i, arr) => arr.map((ele) => ele.display_name).indexOf(goal.display_name) === i)?.map((per, index) => (
                                            <React.Fragment>
                                                <TableRow
                                                    sx={{
                                                        '& > *': { borderBottom: 'unset' },
                                                        '&.MuiTableRow-root.Mui-selected': { backgroundColor: "#b4e0e0" }
                                                    }}
                                                    selected={type.name === "perspective" && type.id === per.id}
                                                    hover={false} key={index}
                                                    onClick={() => { setType({ name: "perspective", id: per.id, rowData: per }); }}
                                                    onContextMenu={(e) => { e.preventDefault(); setType({ name: "perspective", id: per.id, rowData: per }); handleRowClick(e); }}>
                                                    <TableCell 
                                                    padding='none'
                                                        sx={{
                                                            width: {
                                                                md:'20%',
                                                                lg:'30%'
                                                            },
                                                            borderLeft:`4px solid ${per.color}`,
                                                         
                                                        }}
                                                        onMouseLeave={() => setEdit({ index: -1, ind: -1 })}
                                                    >
                                                    <div style={{display:"flex",alignItems:"center"}}>
                                                        <IconButton
                                                            aria-label="expand row"
                                                            size="small"
                                                            onClick={() => { setIndex((prev) => ({ ...prev, per: ind.per === index ? -1 : index })); }}
                                                        >
                                                            {index === ind.per ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                        </IconButton>
                                                        {
                                                            edit.index === index && edit.ind === 0 ?
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
                                                                <Typography className="persp-title" sx={{width: {
                                                                    md:'80%',
                                                                    lg:'80%'
                                                                }}}  onClick={() => setEdit((prev) => ({ ...prev, index: index, ind: 0 }))}>
                                                                    {per.display_name}
                                                                </Typography>
                                                        }
                                                        </div>
                                                    </TableCell>
                                                    <TableCell sx={{ width: "10%" }}>
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: "10%" }}>
                                                        {
                                                            per.weight
                                                        }
                                                    </TableCell>
                                                    <TableCell align="center"sx={{ width: "10%" }} >
                                                        {per.measure}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: "10%" }} >
                                                        {per.baseline}
                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: "10%" }}>

                                                        {per.value}

                                                    </TableCell>
                                                    <TableCell align="center" sx={{ width: "10%" }}>

                                                        {"_"}

                                                    </TableCell>
                                                    <TableCell align="right" sx={{ width: "10%" }} >
                                                        {
                                                            `${Number.isInteger(per?.progress)?Number(per?.progress):Number(per?.progress).toFixed(2)}%`

                                                        }
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{ padding: 0 }} colSpan={8}>
                                                        <Collapse in={index === ind.per} timeout="auto" unmountOnExit>
                                                            <Table aria-label="purchases" sx={{ width: "100%" }} hover={false}>
                                                                <TableBody>
                                                                        {
                                                                            per?.objectives?.filter((goal, i, arr) => goal?.row?.toLowerCase() === per.display_name?.toLowerCase() && arr.map((ele) => ele.id).indexOf(goal.id) === i).map((goal, index) => (
                                                                                    <Goals
                                                                                        per={goal}
                                                                                       
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

export default ProgressTable;