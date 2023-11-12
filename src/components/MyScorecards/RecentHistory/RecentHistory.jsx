import React, { useState } from "react";
import "./RecentHistory.css";
import Popover from "@mui/material/Popover";
import dayjs from "dayjs";

const RecentHistory = ({ recent, setRecent, action, id, data }) => {
  const handleClose = () => setRecent(null);
  const [next, setNext] = useState(2);
  const formattedDate = (date) => {
    const timestamp = date; // Example timestamp
    const formattedDate = dayjs(timestamp).format("YYYY-MM-DD");
    return formattedDate;
  };
  return (
    <Popover
      id={id}
      open={action}
      anchorEl={recent}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      elevation={0}
    >
      <div className="recent-history-popover">
        <div className="history-wrapper">
          <div className="header">
            <div className="texttitle">
              <div>Recent History</div>
            </div>
          </div>
          <div className="body">
            <div className="history-item">
         
              {data?.slice(0, next).map((obj, id) => {
                return (
                  <div className="text-parent" key={id}>
                    <div className="text-child1">
                      {formattedDate(obj?.created_date)}
                    </div>
                    <div className="text2">{obj?.description}</div>
                  </div>
                );
              })}
            </div>

            <div className="stroke-divider">
              <img
                className="line-stroke-icon10"
                alt=""
                src="/images/line-stroke.svg"
              />
            </div>
            {
            next < data?.length &&(
            <div className="view-all-container" onClick={() => setNext(next + data?.length-next)} style={{cursor:"pointer"}}>
              <div className="view-all-text">View All</div>
            </div>)
            }
          
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default RecentHistory;
