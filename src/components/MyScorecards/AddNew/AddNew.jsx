import React, { useState } from "react";
import "./AddNew.css";
import NewScorecard from "../NewScorecard/NewScorecard";
import NewGroup from "../NewGroup/NewGroup";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";

const AddNew = ({ show, add, setShow }) => {
  const [disGroup, setDisGroup] = useState(false);
  const [disScorecard, setDisScorecard] = useState(false);

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={show}
        open={add}
        onClose={() => setShow(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => {setDisScorecard(true); setShow(null);}} sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}>
          <ListItemIcon><img className="icon-style" alt="" src='/images/allscore.svg' /></ ListItemIcon>
          New Scorecard
        </MenuItem>
        <MenuItem onClick={() => {setDisGroup(true); setShow(null)}} sx={{
          color: '#212529',
          fontFamily: 'Figtree',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '150%'
        }}>
          <ListItemIcon>
            <img className="icon-style" alt="" src='/images/myscorecards/newscorecard/wrapper.svg' /></ ListItemIcon>
          New Group
        </MenuItem>
      </Menu>
      <NewGroup disGroup={disGroup} setDisGroup={setDisGroup} />
      <NewScorecard disScorecard={disScorecard} setDisScorecard={setDisScorecard} />
    </>
  )
}
export default AddNew;