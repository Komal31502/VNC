import React, { useContext, useState } from 'react'
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SheetAction } from "../../../../utils/spreadsheet"
import AddItem from './AddItem/AddItem';
import EditAction from './EditAction/EditAction';
import EditGoal from "./EditGoal/EditGoal"
import EditKPI from "./EditKPI/EditKPI"
import { SpreadsheetContext } from '../../../../context/SpreadsheetContext';



const SheetActions = ({ anchorEl, open, setAnchorEl}) => {
  const {type}=useContext(SpreadsheetContext);
  const [addItemShow, setAddItemShow] = useState(false);
  const [editActionShow, setEditActionShow] = useState(false);
  const [editKPIShow, setEditKPIShow] = useState(false);
  const [editGoalShow, setEditGoalShow] = useState(false);
  const handleAddItemHide = () => setAddItemShow(false);
  const handleEditActionHide = () => setEditActionShow(false);
  const handleEditGoalHide = () => setEditGoalShow(false);
  const handleEditKPIHide = () => setEditKPIShow(false);
  const handleActionsItem = (actionMenu) => {
    switch (actionMenu.label) {
      case "Add New Item": {
        setAddItemShow(true);
        setAnchorEl(null);
        break;
      }
      case "Edit Item": {
      switch(type.name)
      {
        case "scorecard":{setEditGoalShow(true);   setAnchorEl(null); break;}
        case "goal":{setEditGoalShow(true);   setAnchorEl(null); break;}
        case "kpi":{setEditKPIShow(true);   setAnchorEl(null); break;}
        case "action":{setEditActionShow(true);  setAnchorEl(null); break;}
        default:{setEditGoalShow(true);   setAnchorEl(null); break;}
      }
      }
      default: {
        setAnchorEl(null)
        break;
      }
    }
  };
  return (
   <>
   {
    type.id==="" && type.name===""?
    <></>:<>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
   
        {SheetAction.map((item, index) => (
        
          <MenuItem onClick={() =>
            handleActionsItem(item)
          } sx={{
            color: '#212529',
            fontFamily: 'Figtree',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '150%'
          }}
          key={index}
          >
        
            <ListItemIcon>
              <img className="icon-style" alt="" src={item.image} />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
       
      
      </Menu>
      </>
        }
      <AddItem AddItemShow={addItemShow} handleAddItemHide={handleAddItemHide} />
      <EditAction EditActionShow={editActionShow} handleEditActionHide={handleEditActionHide}  />
      <EditKPI EditKPIShow={editKPIShow} handleEditKPIHide={handleEditKPIHide}  />
      <EditGoal EditGoalShow={editGoalShow} handleEditGoalHide={handleEditGoalHide}  />
    </>
  )
}

export default SheetActions
