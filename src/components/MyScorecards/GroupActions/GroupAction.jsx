import React, { useState } from "react";
import "./GroupAction.css";
import { groupActions } from "../../../utils/newscorecard";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import DeletePopup from "../../DeletePopup/DeletePopup";
import ScoreDetails from "../ScoreCardDetails/ScoreDetails";
import NewScorecard from "../NewScorecard/NewScorecard";

const GroupAction = ({ grpaction, setGrpAction, grp, data }) => {
  const [disScorecard, setDisScorecard] = useState(false);
  const [delGrp, setDelGrp] = useState(false);
  const [grpDetails, setGrpDetails] = useState(false);
  const [share, setShare] = useState(false);
  const handleActions = (group) => {
    setGrpAction(null);
    switch (group.text) {
      case "Add Scorecard": {
        setDisScorecard(true);
        break;
      }
      case "Share": {
        setShare(true);
        break;
      }
      case "Details": {
        setGrpDetails(true);
        break;
      }
      case "Delete Group": {
        setDelGrp(true);
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={grpaction}
        open={grp}
        onClose={() => setGrpAction(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        elevation={2}
      >
        {groupActions.map((item, index) => {
          return (
            <MenuItem
              onClick={() => handleActions(item)}
              sx={{
                color: "#212529",
                fontFamily: "Figtree",
                fontSize: "18px",
                fontWeight: 400,
                lineHeight: "150%",
              }}
              key={index}
            >
              <ListItemIcon>
                <img className="icon-style" alt="" src={item.icon} />
              </ListItemIcon>
              {item.text}
            </MenuItem>
          );
        })}
      </Menu>
      <NewScorecard
        disScorecard={disScorecard}
        setDisScorecard={setDisScorecard}
        groupId={data.id}
      />
      <DeletePopup delGrp={delGrp} setDelGrp={setDelGrp} groupData={data} />
      <ScoreDetails
        grpDetails={grpDetails}
        setGrpDetails={setGrpDetails}
        groupData={data}
      />
    </>
  );
};

export default React.memo(GroupAction);
