import React, { useContext, useState } from 'react'
import { Avatar, FormControl, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import axios from "axios";
import { ScorecardContext } from '../../../../context/ScorecardContext';
import { rootUrl } from '../../../../Constants';

const MemberList = ({ key, data, scorecardData, setShareMess }) => {
  const { postHistory } = useContext(ScorecardContext);
  const [role, setRole] = useState("");// Add local state for role
  const handleChange = async (event, member) => {
    // Update local state when select value changes
    await axios
      .post(`${rootUrl}/ObjectiveServlet?action=update_project_user&arg=${member.id}&arg1=1`, {
        id: scorecardData?.id,
        user_name: member.user_name,
        role_type: event.target.value,
        permission: "Active"
      })
      .then(function (response) {
        postHistory({
          date_recorded: new Date().getTime(),
          date_updated: new Date().getTime(),
          user_id: "amaiello",
          transaction_type: "share",
          object_type: "scorecard",
          description: `Role of ${member.user_name} has been updated for ${scorecardData?.name} scorecard`,
          status: "New",
          object_id: scorecardData?.id,
          project_id: scorecardData?.id
        })
        setShareMess((prev) => ({ ...prev, active: true }))
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleShare = async (event, member) => {
    if (event.target.checked) {
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=share_scorecard_with_user`, {
          scorecard_id: scorecardData?.id,
          user_name: member.user_name,
          role_name: role,
          permission: "Active"
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "share",
            object_type: "scorecard",
            description: `${scorecardData?.name} scorecard was shared with ${member.user_name}`,
            status: "New",
            object_id: scorecardData?.id,
            project_id: scorecardData?.id
          })
          setShareMess((prev) => ({ ...prev, active: true }))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      await axios
        .post(`${rootUrl}/ObjectiveServlet_Dev?action=update_project_user`, {
          scorecard_id: scorecardData?.id,
          user_name: member.user_name,
          role_type: role===""?scorecardData?.team?.filter((mem) => mem.id === data.id)[0]?.role_name:role,
          permission: "Revoked"
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "share",
            object_type: "scorecard",
            description: `${scorecardData?.name} scorecard permission revoked to ${member.user_name}`,
            status: "New",
            object_id: scorecardData?.id,
            project_id: scorecardData?.id
          })
          setShareMess((prev) => ({ ...prev, revoke: true }))
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }
  return (
    <>
      <div className='members-details-cells' key={key}>
        <div className='left-part-style'>
          <div className='avatar-container'>
            <Avatar sx={{ backgroundColor: "#1976D2" }}>{data.first_name.charAt(0).toUpperCase()}</Avatar>
          </div>
          <div style={{ minWidth: "180px" }}>
            <div className='name-style'>{data.first_name.concat(" ", data.last_name)}</div>
            <div className='username-style'>{data.email_address}</div>
          </div>
        </div>
        <div className='right-part-style'>
          <div>
            <FormControl sx={{ width: 110 }} >
              <InputLabel id={`role-label-${key}`}>Role</InputLabel>
              <Select
                labelId={`role-label-${key}`}
                id={`role-select-${key}`}
                label="Role"
                defaultValue={scorecardData?.team?.filter((mem) => mem.id === data.id)[0]?.role_name}
                autoWidth
                onChange={(e) => {setRole(e.target.value); handleChange(e, data); }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={"Read Only"}>
                  Viewer
                </MenuItem>
                <MenuItem value={"Owner"}>Owner</MenuItem>
                <MenuItem value={"Creator"}>Creator</MenuItem>
                <MenuItem value={"Editor"}>Editor</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <Switch
              onChange={(e) => handleShare(e, data)}
              defaultChecked={scorecardData?.team?.some((mem) => mem.id === data.id && mem.permission!=="Revoked")}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
      </div>

    </>
  )
}

export default MemberList
