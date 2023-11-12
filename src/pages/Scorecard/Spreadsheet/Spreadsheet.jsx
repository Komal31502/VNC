import React, { useEffect, useState } from 'react'
import "./Spreadsheet.css";
import { ReactComponent as SpreadsheetSVG } from "../../../assets/spreadsheets/nav-items/Spreadsheet.svg";
import { ReactComponent as StrategyMapSVG } from "../../../assets/spreadsheets/nav-items/StrategyMap.svg";
import { ReactComponent as DashboardSVG } from "../../../assets/spreadsheets/nav-items/Dashboard.svg";
import { ReactComponent as AlignmentSVG } from "../../../assets/spreadsheets/nav-items/Alignment.svg";
import { ReactComponent as ReportsSVG } from "../../../assets/spreadsheets/nav-items/Reports.svg";
import { ReactComponent as ToolsSVG } from "../../../assets/spreadsheets/nav-items/Tools.svg";
import ProgressComponents from "../../../components/Scorecard/Spreadsheets/ProgressComponents/ProgressComponents";
import PerformanceComponents from "../../../components/Scorecard/Spreadsheets/PerformanceComponents/PerformanceComponents";
import BudgetComponents from "../../../components/Scorecard/Spreadsheets/BudgetComponents/BudgetComponents";
import Types from "../../../components/Scorecard/Spreadsheets/Types/Types";
import SpreadsheetSidebar from "../../../components/Scorecard/Spreadsheets/Sidebar/SpreadsheetSidebar";
import StrategyMap from '../StrategyMap/StrategyMap';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SpreadsheetContext } from '../../../context/SpreadsheetContext';
import ToolOptions from '../../../components/Scorecard/Spreadsheets/KPITools/ToolOption/ToolOption';


const Progress = () => {
  const { setScoreId, scoreId } = useContext(SpreadsheetContext) || {};

  const navigate = useNavigate();
  const { state } = useLocation();

  const [value, setValue] = React.useState('1');
  const [collapse, setCollapse] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //handle menu popover
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOption, setIsToolsOptions] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [spreadsheet, setSpreadsheet] = useState("Progress");
  const [toolAnchorEl, setToolAnchorEl] = React.useState(null);

  const showToolOptions = Boolean(toolAnchorEl);



  useEffect(() => {
    if (state) {
      setScoreId(state.score.id)
    }
  }, [state]);
  const handleClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false)
  };
  const handleTypeTabClick = (value, currentNode) => {
    if (value === '1') {
      setIsMenuOpen(true)
      setAnchorEl(currentNode);
    }
    else {
      setIsMenuOpen(false)
      setIsToolsOptions(false)
    }
  }

  const handleToolTabClick = (value, currentNode) => {
    if (value === '6') {
      setIsToolsOptions(true)
      setToolAnchorEl(currentNode)
    }
    else {

    }
  }
  const handleSpreadsheet = () => {
    switch (spreadsheet) {
      case "Progress": { return <ProgressComponents spreadsheet={spreadsheet} />; }
      case "Performance": { return <PerformanceComponents spreadsheet={spreadsheet} />; }
      case "Budget": { return <BudgetComponents spreadsheet={spreadsheet} />; }
      case "Task": {
        return (
          <div>
            Tasks
          </div>
        )
      }
      default: { return <ProgressComponents spreadsheet={spreadsheet} />; }
    }
  }

  return (
    <>
      {
        state?.score ?
          <div className='progress-parent'>
            <div className='spreadsheet-header'>
              <div className='progress-left-container'>
                <div onClick={() => { localStorage.setItem("scorecard", scoreId); navigate("/scorecards") }} style={{ cursor: "pointer" }}>
                  <img alt="" src="/images/scorecard/spreadsheets/table-icons/back-icon.svg" />
                </div>
                <div className='breadcumb-text'>Scorecards</div>
              </div>
              <div className='progress-right-container'>
                <div className='icon-style'>
                  <img alt="" src="/images/scorecard/spreadsheets/table-icons/chat-icon.svg" />
                </div>
                <div className='icon-style'>
                  <img alt="" src="/images/scorecard/spreadsheets/table-icons/question.svg" />
                </div>
                <div className='icon-style'>
                  <img alt="" src="/images/scorecard/spreadsheets/table-icons/search.svg" />
                </div>
              </div>
            </div>
            <div className='tabs-parent'>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab icon={<SpreadsheetSVG />} value="1" onClick={(event) => {
                        handleTypeTabClick('1', event.currentTarget);
                      }} />
                      <Tab icon={<StrategyMapSVG />} value="2" />
                      <Tab icon={<DashboardSVG />} value="3" />
                      <Tab icon={<AlignmentSVG />} value="4" />
                      <Tab icon={<ReportsSVG />} value="5" />
                      <Tab icon={<ToolsSVG />} onClick={(event) => {
                        handleToolTabClick('6', event.currentTarget)
                      }} value="6" />
                    </TabList>
                  </Box>
                  <TabPanel className='p-0' value="1">
                    <div className='spreadsheet-container'>
                      <div className='progress-container' style={{ width: collapse ? "98%" : "75%" }}>
                        {handleSpreadsheet()}
                        <div className="spreadIcon" onClick={() => setCollapse(!collapse)}>
                          <img
                            src="/images/Collapsebutton.svg"
                            alt="collapse"
                            style={{ transform: collapse ? "rotate(180deg)" : "none" }}
                          />
                        </div>
                      </div>
                      <div className='progress-sidebar' style={{ display: collapse ? "none" : "block" }}>
                        <SpreadsheetSidebar />
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel className='p-0' value="2"><StrategyMap /></TabPanel>
                  <TabPanel className='p-0' value="3">Dashboard</TabPanel>
                  <TabPanel className='p-0' value="4">Alignment</TabPanel>
                  <TabPanel className='p-0' value="5">Reports</TabPanel>
                  <TabPanel className='p-0' value="6">
                    <div className='spreadsheet-container'>
                      <div className='progress-container' style={{ width: collapse ? "98%" : "75%" }}>
                        {handleSpreadsheet()}
                        <div className="spreadIcon" onClick={() => setCollapse(!collapse)}>
                          <img
                            src="/images/Collapsebutton.svg"
                            alt="collapse"
                            style={{ transform: collapse ? "rotate(180deg)" : "none" }}
                          />
                        </div>
                      </div>
                      <div className='progress-sidebar' style={{ display: collapse ? "none" : "block" }}>
                        <SpreadsheetSidebar />
                      </div>
                    </div>
                  </TabPanel>
                </TabContext>
                {isMenuOpen && (
                  <Types
                    currentNode={anchorEl}
                    open={isMenuOpen}
                    handleClose={handleClose}
                    setSpreadsheet={setSpreadsheet}
                  />
                )}
                {
                  isToolsOption && (
                    <ToolOptions
                      currentNode={toolAnchorEl}
                      setToolAnchorEl={setToolAnchorEl}
                      open={showToolOptions}

                    />
                  )
                }
              </Box>
            </div>

          </div> : <div style={{ position: "absolute", left: "30%", top: "30%", color: "black", fontWeight: '600' }}>
            <div>
              Please select the particular scorecard on below link of myscorecards to get the spreadsheet.
            </div>
            <NavLink to='/scorecards' style={{ display: "flex", justifyContent: "center" }}>
              Scorecards
            </NavLink>
          </div>
      }

    </>
  )
}

export default Progress
