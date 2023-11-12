import React, { useState, useEffect, useContext } from "react";
import { rootUrl } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";

function GoalsAlert() {
  const {userDetails}=useContext(AuthContext);
  const [goalAlert, setGoalAlert] = useState([]);
  useEffect(() => {
    fetch(`${rootUrl}/HomeDashboard?arg=goal_alerts&arg1=${userDetails.name}&arg2=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setGoalAlert(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="container">
      <div className="card4">
        <div className="text-and-supporting-text6">
          <div className="supporting-text17">Goals overdue for update</div>
          <div className="target-parent">
            <img className="target-icon" alt="" src="/images/target.svg" />

            <b className="heading5">{goalAlert.total_overdue}</b>
          </div>
        </div>
      </div>
      <div className="card4">
        <div className="text-and-supporting-text6">
          <div className="text36">Goals 2 weeks overdue</div>
          <div className="overdue-parent">
            <img className="target-icon" alt="" src="/images/overdue1.svg" />

            <b className="heading5">{goalAlert.two_weeks_overdue}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalsAlert;
