import React, { useState } from "react";
import Divider from '@mui/material/Divider';
import "./ToolOptions.css";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import PlanningTool from "../../KPITools/PlanningTool/PlanningTool"
import ValuesEditor from "../ValuesEditor/ValuesEditor";
import GoalAlignLink from "../GoalAlignLink/GoalAlignLink"

const ToolOptions = ({ currentNode, open, setToolAnchorEl }) => {
  const [planToolShow, setPlanToolShow] = useState(false);
  const [showValuesEditor, setShowValuesEditor] = useState(false);
  const [showGoalAlign, setShowGoalAlign] = useState(false)
  const handleToolClick = (menuName) => {
    setToolAnchorEl(null)
    switch(menuName){
      case "Planning Tool" : {
        setPlanToolShow(true);
        break;
      }
      case "Values Editor" : {
        setShowValuesEditor(true)
        break;
      }
      case "Paste Item" : {
        setShowGoalAlign(true)
      }
      default: {
        break;
      }
    }
  }
  
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={currentNode}
        open={open}
        onClose={() => setToolAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Find Item")}
        >
          <ListItemIcon><SearchOutlinedIcon /></ListItemIcon>
          Find Item
        </MenuItem>
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Import data")}
        >
          <ListItemIcon><FolderSpecialOutlinedIcon /></ListItemIcon>
          Import data
        </MenuItem>
        <Divider/>
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Planning Tool")}
        >
          <ListItemIcon><EventAvailableOutlinedIcon/></ListItemIcon>
         Planning Tool
        </MenuItem>
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Values Editor")}
        >
          <ListItemIcon><EditOutlinedIcon /></ ListItemIcon>
        Values Editor
        </MenuItem>
        <Divider/>
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Copy Item")}
        >
          <ListItemIcon><ContentCopyOutlinedIcon /></ListItemIcon>
        Copy Item
        </MenuItem>
        <MenuItem sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}
        onClick={() => handleToolClick("Paste Item")}
        >
          <ListItemIcon><ContentPasteOutlinedIcon /></ListItemIcon>
          Paste Item
        </MenuItem>
      </Menu>
      <PlanningTool planToolShow={planToolShow} setPlanToolShow={setPlanToolShow} />
      <ValuesEditor showValuesEditor={showValuesEditor} setShowValuesEditor={setShowValuesEditor} />
      <GoalAlignLink showGoalAlign={showGoalAlign} setShowGoalAlign={setShowGoalAlign}/>
    </>
  )
}
export default ToolOptions;