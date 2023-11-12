import React from 'react'
import "./Types.css"
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SpreadsheetTypes } from '../../../../utils/spreadsheet';

const Type = ({ currentNode, open, handleClose,setSpreadsheet}) => {
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={currentNode}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {SpreadsheetTypes.map((item, index) => (
          <MenuItem onClick={() => {
            handleClose();
            switch (item.label) {
              case 'Performance': {
                setSpreadsheet("Performance")
                break;
              }
              case 'Progress': {
                setSpreadsheet("Progress")
                break;
              }
              case 'Budget': {
                setSpreadsheet("Budget")
                break;
              }
              default: {
                setSpreadsheet("Progress")
                break;
              }
            }
          }} sx={{
            color: '#212529',
            fontFamily: 'Figtree',
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '150%'
          }}
            key={index}
            disabled={item.label==="Tasks"}
          >
            <ListItemIcon>
              <img className="icon-style" alt="" src={item.image} />
            </ListItemIcon>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default Type
