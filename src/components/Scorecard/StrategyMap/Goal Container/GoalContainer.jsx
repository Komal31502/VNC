import React, { useContext, useState } from 'react';
import './GoalContainer.css'
import Card from '@mui/material/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SpreadsheetContext } from '../../../../context/SpreadsheetContext';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CallReceivedOutlinedIcon from '@mui/icons-material/CallReceivedOutlined';
import CallMadeIcon from '@mui/icons-material/CallMade';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import SheetActions from '../../Spreadsheets/SheetActions/SheetActions';



export default function GoalContainer({ goal, index, per }) {
  const { tableData, setType, type } = useContext(SpreadsheetContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleExpandClick = (index) => {
    setActiveIndex((prev) => prev === index ? null : index);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const showAddItem = Boolean(anchorEl)
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const iconType = (icon) => {
    switch (icon) {
      case "Action": { return "/images/scorecard/strategymap/action.svg"; }
      case "Success Factor": { return "/images/scorecard/strategymap/success.svg"; }
      case "Expected Outcome": { return "/images/scorecard/spreadsheets/table-icons/expected.svg"; }
      case "Rationale": { return "/images/scorecard/spreadsheets/table-icons/task.svg"; }
      case "Hypothesis": { return "/images/scorecard/strategymap//hypothesis.svg"; }
      case "Risk": { return "/images/scorecard/spreadsheets/table-icons/risk-factor.svg"; }
      case "Cascaded": { return "/images/scorecard/spreadsheets/table-icons/rectangle.svg"; }
      case "Linked": { return "/images/scorecard/spreadsheets/table-icons/link-icon.svg"; }
      case "Dependency": { return "/images/scorecard/spreadsheets/table-icons/dependency.svg"; }
      case "Reasoning": { return "/images/scorecard/strategymap/reasoning.svg"; }
      default: { break; }
    }
  }
  const handleRowClick = (event) => {
    setIsMenuOpen(true);
    setAnchorEl(event.currentTarget);
  }
  return (
    <>
      <Card sx={{
        padding: 2,
        cursor: "pointer",
        borderRadius: '12px',
        backgroundColor: (type.id === goal.id) ? "#b4e0e0" : '#fff',
        boxShadow: '0px 6px 12px rgba(1, 45, 97, 0.04)',
        border: '1px solid #e9ecef',
        boxSizing: 'border-box',
        minWidth:'300px',
        height: activeIndex === index ? "100%" : "140px"
      }}
        key={index}
        onClick={() => { setType((prev) => ({ ...prev, name: "goal", id: goal.id, rowData: goal })); }}
        onContextMenu={(e) => { e.preventDefault(); handleRowClick(e); }}
      >
        <CardContent sx={{padding:"0px"}}>
          <Grid container xs={12} justifyContent={"space-between"} sx={{ paddingBottom: 2 }}>
            <Grid item xs={9}>
              <span className='goal-title'>{goal.title}</span>
            </Grid>
            <Grid item xs={3}>
              <Chip label="At Risk" style={{ background: "#f7d483", fontSize: "12px" }} size="small" />
            </Grid>
          </Grid>
          <Grid container xs={12} spacing={2} alignItems={"center"}>
            <Grid item xs={10}>
              <ProgressBar striped variant="success" now={goal.progress.toFixed(2)} />
            </Grid>
            <Grid item xs={2}>
              <Typography>{goal.progress.toFixed(2)}%</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing style={{ width: "100%", padding: "0px 16px" }}>
          <Avatar sx={{ width: "20px", height: "20px", fontSize: '12px' }}>{tableData.created_by.charAt(0).toUpperCase()}</Avatar>
          <span className="card-label-design">{tableData.created_by.charAt(0).toUpperCase() + tableData.created_by.slice(1).toLowerCase()}</span>
          <LocalOfferOutlinedIcon style={{ height: "18px", weight: "18px" }} className='card-label-design' />
          <span className='perspective-label'>{per.display_name}</span>
          {
            goal?.kpis?.length === 0 && goal?.tasks?.length === 0 ? null : (
              <IconButton onClick={() => handleExpandClick(index)}>
                {activeIndex !== index ?
                  <ExpandMoreIcon /> :
                  <ExpandLessIcon />
                }
              </IconButton>
            )
          }
        </CardActions>
        <Collapse in={activeIndex === index} timeout="auto" unmountOnExit>
          <Divider style={{ marginBottom: "12px" }} />
          <Stack direction="row" spacing={1} style={{ display: "flex", alignItems: 'flex-start', marginBottom: "16px", paddingLeft: "12px" }}>
            <Chip icon={<CallMadeIcon color="success" />} label="50%" style={{ backgroundColor: "#fff7f0", width: "50%" }} />
            <Chip
              icon={<CallReceivedOutlinedIcon style={{ color: 'red' }} />}
              label="65%"
              style={{ backgroundColor: "#ecfff2", width: "50%" }}

            />
          </Stack>
          <Divider />
          <CardContent sx={{padding:"0px",
          '&.MuiCardContent-root:last-child':{paddingBottom:"0px"}
        }}>

            {
              goal?.kpis?.filter((kp, i, arr) => arr.map((ele) => ele.title).indexOf(kp.title === i)).map((kpi, ind) => (
                <Grid container xs={12} spacing={1} style={{ margin:"12px 0px", cursor: "pointer", background: (type.id === kpi.id) ? "#b4e0e0" : "" }} key={ind}
                  onClick={() => setType((prev) => ({ ...prev, name: "kpi", id: kpi.id, rowData: kpi }))}
                  onContextMenu={(e) => { e.preventDefault(); setType({ name: "kpi", id: kpi.id, rowData: kpi }); handleRowClick(e); }}
                >
                  <Grid item xs={1}>
                    <img alt="" src="/images/scorecard/strategymap/KPI.svg" style={{width:"20px",height:"21px"}} />
                  </Grid>
                  <Grid item xs={8}>
                    <span className='actions-text-style'>{kpi.title}</span>
                  </Grid>
                  <Grid item xs={3} style={{ display: "flex", flexDirection: "flex-end" }}>
                    <Chip label={`${kpi.progress.toFixed(2)}%`} style={{ background: "#f7d483" }} size="small" />
                  </Grid>
                </Grid>
              ))
            }
            {
              goal?.tasks?.filter((task, i, arr) => arr.map((ele) => ele.title).indexOf(task.title === i)).map((action, ind1) => (
                <Grid container xs={12} spacing={1} style={{ margin: "12px 0px", cursor: "pointer", background: (type.id === action.id) ? "#b4e0e0" : "" }}
                  key={ind1}
                  onClick={() => setType((prev) => ({ ...prev, name: "action", id: action.id, rowData: action }))}
                  onContextMenu={(e) => { e.preventDefault(); setType({ name: "action", id: action.id, rowData: action }); handleRowClick(e); }}
                >
                  <Grid item xs={1}>
                    <img alt="" src={iconType(action.type)} />
                  </Grid>
                  <Grid item xs={8}>
                    <span className='actions-text-style'>{action.title}</span>
                  </Grid>
                  <Grid item xs={3} style={{ display: "flex", flexDirection: "flex-end" }}>
                    <Chip label={`${action.progress.toFixed(2)}%`} style={{ background: "#f7d483" }} size="small" />
                  </Grid>
                </Grid>
              ))
            }
          </CardContent>
        </Collapse>
      </Card>
      {isMenuOpen && (
        <SheetActions
          anchorEl={anchorEl}
          open={showAddItem}
          setAnchorEl={setAnchorEl}

        />
      )}
    </>
  );
}