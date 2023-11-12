import React, { useContext } from "react"
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';

export function GroupScoreMenu({ anchorEl, handleCloseMenu, handleItemSelect, flag }) {
  const { assets } = useContext(SpreadsheetContext);
  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      elevation={2}
    >
      {assets?.groups?.map((group, index) => (
        <div key={index}>
          <MenuItem
            onClick={() => handleItemSelect(group?.name)}
            disabled
            key={index}
          >
            <ListItemIcon>
              <img alt="" src="/images/scorecard/spreadsheets/goal-align-link/folder.svg" />
            </ListItemIcon>
            {group?.name}
          </MenuItem>
          <div style={{ marginLeft: '24px', padding: '4px' }}>
            {
              group?.scorecards?.map((score, index) => {
                return (
                  <>
                    <MenuItem onClick={() => handleItemSelect({ name: score?.name, id: score?.id })} key={index}>
                      <ListItemIcon><img alt="" src="/images/scorecard/spreadsheets/goal-align-link/scorecard.svg" /></ListItemIcon>
                      {score?.name}
                    </MenuItem>
                  </>
                )
              })
            }
          </div>
        </div>
      ))}
    </Menu>
  )
}

export function SourceItemMenu({ anchorEl, handleCloseMenu, handleItemSelect, sourceItems, flag}) {
  const handleIcons = (name) => {
    if (name.includes("finance")) {
      return "/images/scorecard/spreadsheets/goal-align-link/dollar.svg"
    }
    else if (name.includes("customer")) {
      return "/images/scorecard/spreadsheets/goal-align-link/customer.svg"
    }
    else if (name.includes("another")) {
      return "/images/scorecard/spreadsheets/goal-align-link/learning.svg"
    } else {
      return "/images/scorecard/spreadsheets/goal-align-link/dollar.svg"
    }
  }
  const iconType = (icon) => {
    switch (icon) {
        case "KPI": { return "/images/scorecard/spreadsheets/table-icons/KPI.svg"; }
        case "Action": { return "/images/scorecard/spreadsheets/table-icons/task.svg"; }
        case "Success Factor": { return "/images/scorecard/spreadsheets/table-icons/success.svg"; }
        case "Expected Outcome": { return "/images/scorecard/spreadsheets/table-icons/expected.svg"; }
        case "Rationale": { return "/images/scorecard/spreadsheets/table-icons/task.svg"; }
        case "Hypothesis": { return "/images/scorecard/spreadsheets/table-icons/hypothesis.svg"; }
        case "Risk": { return "/images/scorecard/spreadsheets/table-icons/risk-factor.svg"; }
        case "Cascaded": { return "/images/scorecard/spreadsheets/table-icons/rectangle.svg"; }
        case "Linked": { return "/images/scorecard/spreadsheets/table-icons/link-icon.svg"; }
        case "Dependency": { return "/images/scorecard/spreadsheets/table-icons/dependency.svg"; }
        case "Reasoning": { return "/images/scorecard/spreadsheets/table-icons/reasoning.svg"; }
        default: { break; }
    }
}

  return (
    <Menu
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleCloseMenu}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      elevation={2}
    >
      {sourceItems?.filter((goal, i, arr) => arr.map((ele) => ele.display_name).indexOf(goal.display_name) === i)?.map((per, index) => (
        <div key={index}>
          <MenuItem
            onClick={() => handleItemSelect(per?.display_name)}
            key={index}
          >
            <ListItemIcon>
              <img alt="" src={handleIcons(per?.name)} />
            </ListItemIcon>
            {per?.display_name}
          </MenuItem>
          <div style={{ marginLeft: '24px', padding: '4px' }}>
            {
              per?.objectives?.filter((goal, i, arr) => goal?.row?.toLowerCase() === per.display_name?.toLowerCase() && arr.map((ele) => ele.id).indexOf(goal.id) === i).map((goal, index) => {

                return (
                  <>
                    <MenuItem onClick={() => handleItemSelect({name: goal?.title , id:goal?.id})} key={index}>
                      <ListItemIcon><img alt="" src="/images/scorecard/spreadsheets/table-actions/goal.svg" /></ListItemIcon>
                      {goal?.title}
                    </MenuItem>
                    <div style={{ marginLeft: '24px', padding: '4px' }}>
                      {
                        goal?.kpis?.filter((kp,i,arr) => kp?.delete_flag === 0 && arr.map((ele) => ele.title).indexOf(kp.title === i))?.map((kp, indKpi) => {
                          return (
                            <>
                              <MenuItem onClick={() => handleItemSelect(kp?.name)} key={indKpi}>
                                <ListItemIcon><img alt="" src="/images/scorecard/spreadsheets/table-icons/KPI.svg" /></ListItemIcon>
                                {kp?.title}
                              </MenuItem>
                            </>
                          )
                        })

                      }
                    </div>
                    <div style={{ marginLeft: '24px', padding: '4px' }}>
                      {
                        goal?.tasks?.filter((task, i, arr) => arr.map((ele) => ele.title).indexOf(task.title === i))?.map((act, index) => {
                          return (
                            <>
                              <MenuItem onClick={() => handleItemSelect(act?.name)} key={index}>
                                <ListItemIcon> <img alt="" src={iconType(act.type)}/></ListItemIcon>
                                {act?.title}
                              </MenuItem>
                            </>
                          )
                        })

                      }
                    </div>
                  </>
                )
              })

            }
          </div>
        </div>
      ))}
    </Menu>
  )
}




