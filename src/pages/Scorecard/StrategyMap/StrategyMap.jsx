import React, { useState, useContext } from 'react'
import GoalContainer from '../../../components/Scorecard/StrategyMap/Goal Container/GoalContainer'
import { SpreadsheetContext } from '../../../context/SpreadsheetContext';
import SpreadsheetSidebar from "../../../components/Scorecard/Spreadsheets/Sidebar/SpreadsheetSidebar";
import "./StrategyMap.css";
import { Grid } from '@mui/material';
import SheetActions from '../../../components/Scorecard/Spreadsheets/SheetActions/SheetActions';
import DeleteItem from '../../../components/Scorecard/Spreadsheets/SheetActions/DeleteItem/DeleteItem';
import AddItem from '../../../components/Scorecard/Spreadsheets/SheetActions/AddItem/AddItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StrategyMap = () => {
  const { goals,setType,tableData} = useContext(SpreadsheetContext);
  const [collapse, setCollapse] = useState({
    perspective: false,
    sidebar: false
  })
  const [open,setOpen]=useState({
    bool:false,
    past:false,
    future:false
});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const showAddItem = Boolean(anchorEl)
  const [addItemShow, setAddItemShow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [del, setDelete] = useState(false);
  const handleAddItemHide = () => setAddItemShow(false);
  const [date, setDate] = useState({
    month:getMonthName(new Date().getMonth()),
    year:new Date().getFullYear()
});
  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber);
  
    return date.toLocaleString('en-US', {
      month: 'short',
    });
  }
  return (
    <>
      <div className='strategy-map-parent'>
        <div className='main-content' style={{ width: collapse.sidebar ? "98%" : "75%" }}>
          <div style={{ width: "100%" }} className='strategy-map-header'>
            <div className='left-side'>
              <span className='strategy-header'>{tableData.name}</span>
              <span className='strategy-subheader'>{tableData.description}</span>
            </div>
   
            <div className='right-side'>
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
                    setType({name: "scorecard", id: tableData.id, rowData: tableData })
                }
                else
                {
                    setIsMenuOpen(true); setAnchorEl(e.currentTarget);
                }
            }} style={{ cursor: "pointer" }}>
                <img alt="" src="/images/scorecard/spreadsheets/table-icons/plus.svg" />
              </div>
              <div onClick={() => setDelete(true)} style={{ cursor: "pointer" }}>
                <img alt="" src="/images/scorecard/spreadsheets/table-icons/garbagebin.svg" />
              </div>
            </div>
          </div>
          <div style={{ width: "100%",height:"100%"}} className='divider-style'></div>
            <div style={{ display: collapse?.perspective?"none":"flex", width: "100%", height: "895px",flexDirection:"column",position:"relative"}}>
                {
                  tableData?.perspectives?.map((per, index) => {
                    return (
                      <>
                      <div style={{display:"flex",gap:"24px"}}>
                        <div className='perspective-container' key={index}>
                          <div style={{ backgroundColor: per.color }} className='persp-header' >{per.display_name}</div>
                          <span className='perspective-subheader'>
                            {per.question}
                          </span>
                        </div>
                        <div style={{width:"75%"}}>
                            {
                              per?.objectives?.length !== 0 ?
                                <Grid container xs={12} style={{ padding:"24px 0px",gap: "24px", width: "100%" }} key={index}>
                                  {
                                    per?.objectives?.filter((goal, i, arr) => goal?.row?.toLowerCase() === per.display_name?.toLowerCase() && arr.map((ele) => ele.id).indexOf(goal.id) === i).map((goal, index1) => {
                                      return (
                                        <GoalContainer index={index1} goal={goal} per={per} />
                                      )
                                    })
                                  }
                                </Grid> :
                                <Grid container xs={12} style={{ gap: "24px", width: "100%" }}>
                                </Grid>
                            }
                        
                        </div>
                      </div>
                      <div style={{ width: "100%", border:'0.001px solid rgb(230, 230, 230)'}}></div>
                      </>
                    )
                  })
                }
                <div className='collapse-icon' onClick={() => setCollapse((prev) => ({ ...prev, perspective: !collapse.perspective }))}>
                <img
                  src="/images/Collapsebutton.svg"
                  alt="collapse"
                  style={{ transform: collapse.perspective ? "rotate(180deg)" : "none" }}
                />
              </div>
            </div>
            <div  style={{ display: collapse?.perspective ? "flex" : "none", width: "100%",  height: "895px",flexDirection:"column",position:"relative" }}>
              {
                tableData?.perspectives?.map((per, index) => {
                  return (
                    <>
                    <div style={{display:"flex",gap:"24px"}}>
                      <div className='perspec-index' style={{ backgroundColor: per.color, borderRight: `2px solid ${per.color}` }} key={index}>
                        <div className='disp-header'>{per.display_name}</div>
                      </div>
                      <div style={{width:"calc(100% - 40px)"}}>
                       {
                          per?.objectives?.length!==0?
                          <Grid container xs={12} style={{ padding:"24px 0px",gap: "24px", width: "100%" }} key={index}>
                            {
                              per?.objectives?.filter((goal, i, arr) => goal?.row?.toLowerCase() === per.display_name?.toLowerCase() && arr.map((ele) => ele.id).indexOf(goal.id) === i).map((goal, ind) => {
                                return (
                                  <GoalContainer index={ind} goal={goal} per={per} />
                                )
                              })
                            }
                          </Grid>:
                          <Grid container xs={12} style={{ gap: "24px", width: "100%" }}>
                          </Grid>
                          }

                      </div>
                    </div>
                    <div style={{ width: "100%", border:'0.001px solid rgb(230, 230, 230)'}}></div>
                    </>
                  )
                })
              }
              <div className='collapse-right' onClick={() => setCollapse((prev) => ({ ...prev, perspective: !collapse.perspective }))}>
              <img
                src="/images/Collapsebutton.svg"
                alt="collapse"
                style={{ transform: collapse.perspective ? "rotate(180deg)" : "none" }}
              />
            </div>
            </div>
          </div>
        <div className='collapsable-icon' onClick={() => setCollapse((prev) => ({ ...prev, sidebar: !collapse.sidebar }))}>
          <img
            src="/images/Collapsebutton.svg"
            alt="collapse"
            style={{ transform: collapse.sidebar ? "rotate(180deg)" : "none" }}
          />
        </div>
        <div style={{height:"895px"}} className='divider-style'></div>
        <div style={{ width: "25%", display: collapse.sidebar ? "none" : "block" }}>
          <SpreadsheetSidebar />
        </div>
      </div>
      {isMenuOpen && (
        <SheetActions
            anchorEl={anchorEl}
            open={showAddItem}
            setAnchorEl={setAnchorEl}

        />
    )}
    <DeleteItem del={del} setDelete={setDelete} />
    <AddItem AddItemShow={addItemShow} handleAddItemHide={handleAddItemHide} />
    </>

  )
}

export default StrategyMap;