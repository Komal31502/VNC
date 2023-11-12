import React, { useState, useEffect, useContext } from "react";
import Chart from "react-apexcharts";
import { ProgressBar } from "react-bootstrap";
import { rootUrl } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";
function GoalsCompletion() {
  const {userDetails}=useContext(AuthContext);

  const [goalsCompletion, setGoalsCompletion] = useState([]);
  const [gaugeChartData] = useState({
    series: [76],
    options: {
      chart: {
        type: "radialBar",
        offsetY: -20,
        labels: ["Progress"],
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 5,
            size: "75%",
          },
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 1, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "10px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        colors: ["#12B76A"],
      },
    },
  });
  useEffect(() => {
    fetch(`${rootUrl}/HomeDashboard?arg=goals_completion&arg1=${userDetails.name}&arg2=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setGoalsCompletion(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="card">
      <div className="text-and-supporting-text-parent">
        <div className="text-and-supporting-text6">
          <div className="heading">Goals Completion</div>
          <div className="supporting-text8">Last 60 days</div>
        </div>
        <div className="frame-parent">
          <Chart
            options={gaugeChartData.options}
            series={gaugeChartData.series}
            type="radialBar"
          />
        </div>
      </div>
      <div className="body1">
        <div className="frame-group">
          <div className="frame-container">
            <div className="parent">
              <b className="b">{goalsCompletion.on_time_count}</b>
              <div className="on-track">On Track</div>
              <b className="b1">{goalsCompletion.on_time_percent}%</b>
            </div>
            <ProgressBar
              className="progress-success"
              now={goalsCompletion.on_time_percent}
              animated
            />
          </div>
          <div className="frame-container">
            <div className="parent">
              <b className="b">{goalsCompletion.at_risk_count}</b>
              <div className="on-track">At Risk</div>
              <b className="b1">{goalsCompletion.at_risk_percent}%</b>
            </div>
            <ProgressBar
              className="progress-warning"
              now={goalsCompletion.at_risk_percent}
              animated
            />
          </div>
          <div className="frame-container">
            <div className="parent">
              <b className="b">{goalsCompletion.late_count}</b>
              <div className="on-track">Late</div>
              <b className="b1">{goalsCompletion.late_percent}%</b>
            </div>
            <ProgressBar
              className="progress-danger"
              now={goalsCompletion.late_percent}
              animated
            />
          </div>
          <div className="frame-container">
            <div className="parent">
              <b className="b">{goalsCompletion.unscheduled_count}</b>
              <div className="on-track">Incomplete</div>
              <b className="b1">{goalsCompletion.unscheduled_count}%</b>
            </div>
            <ProgressBar
              className="progress-info"
              now={goalsCompletion.unscheduled_count}
              animated
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalsCompletion;
