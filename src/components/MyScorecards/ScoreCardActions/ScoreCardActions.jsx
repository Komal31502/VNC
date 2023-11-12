/* eslint-disable no-lone-blocks */
import React, { useState } from "react";
import "./ScoreCardActions.css";
import { scorecardActions } from "../../../utils/newscorecard";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import DeletePopup from "../../DeletePopup/DeletePopup";
import ScoreDetails from "../ScoreCardDetails/ScoreDetails";
import ManageScorecard from "../ManageScorecard/ManageScorecard";
import MainEmpty from "../ShareScorecard/MainEmpty/MainEmpty";

const ScoreCardActions = ({ scoreaction, setScoreAction, score, data }) => {
    const [delScore, setDelScore] = useState(false);
    const [scoreDetails, setScoreDetails] = useState(false);
    const [manage, setManage] = useState(false);
    const [share, setShare] = useState(false);
    const handleActions = (group) => {
        setScoreAction(null);
        switch (group.text) {
            case "Share": { setShare(true); break; }
            case "Details": { setScoreDetails(true); break; };
            case "Manage": {
                setManage(true);
                break;
            };
            case "Delete Scorecard": { setDelScore(true); break; }
            default: { break; }
        }
    }
    return (
        <>
            <Menu
                id="basic-menu"
                anchorEl={scoreaction}
                open={score}
                onClose={() => setScoreAction(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                elevation={1}
            >
                {scorecardActions.map((item, index) => {
                    return (
                        <MenuItem onClick={() => handleActions(item)} sx={{
                            color: '#212529',
                            fontFamily: 'Figtree',
                            fontSize: '18px',
                            fontWeight: 400,
                            lineHeight: '150%'
                        }} key={index}>
                            <ListItemIcon>
                                <img className="icon-style" alt="" src={item.icon} />
                            </ListItemIcon>
                            {item.text}
                        </MenuItem>
                    )
                })}
            </Menu>
            <MainEmpty share={share} setShare={setShare} scorecardData={data} />
            <DeletePopup delScore={delScore} setDelScore={setDelScore} scorecardData={data} />
            <ScoreDetails scoreDetails={scoreDetails} setScoreDetails={setScoreDetails} scorecardData={data} />
            <ManageScorecard setManage={setManage} manage={manage} scorecardData={data}  />
        </>
    )
}

export default ScoreCardActions;