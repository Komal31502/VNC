import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { rootUrl } from "../Constants";
import { AuthContext } from "./AuthContext";

export const SpreadsheetContext = createContext(null);
const SpreadsheetContextProvider = ({ children }) => {
  const {userDetails}=useContext(AuthContext);
  const [themeData, setThemeData] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [scoreId, setScoreId] = useState();
  const [scorecards, setMyScorecards] = useState([]);
  const [perspectives, setPerspectives] = useState([]);
  const [goals, setGoals] = useState([]);
  const [assets,setAssets]=useState([]);
  const [kpis, setKPIs] = useState([]);
  const [actions, setActions] = useState([]);
  const [goalComments, setGoalComments] = useState([]);
  const [kpiComments, setkpiComments] = useState([]);
  const [actionComments, setActionComments] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [type, setType] = useState({
    name: "",
    id: "",
    rowData: {}
  })

  async function getCompanyAssets()
  {
    await axios.get(`${rootUrl}/SharingServlet?arg=groups_scorecards&company_id=1&user_name=${userDetails.name}`)
    .then(function (response) {
      setAssets(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function getGoalComments(id) {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=objective_comments&objective_id=${id}`)
      .then((res) => {
        setGoalComments(res.data.data)
      })
      .catch((err) => {

        console.log(err)
      })
  }

  async function getGroups() {
    await fetch(
      `${rootUrl}/ObjectiveServlet?action=get&arg=user_groups&arg1=amaiello&arg2=${userDetails?.company_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setGroups(data.data);
      })
      .catch((err) => {

        console.log(err.message);
      });
  }

  async function getActionComments(id) {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=action_comments&action_id=${id}`)
      .then((res) => {
        setActionComments(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getKPIComments(id) {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=kpi_comments&kpi_id=${id}`)
      .then((res) => {
        setkpiComments(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function getThemeData() {
    await fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=themes&arg1=${userDetails?.name}`)
      .then((res) => res.json())
      .then((data) => {
        setThemeData(data.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
  async function getIndicator() {
    await fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=indys&arg1=${userDetails?.name}`)
      .then((res) => res.json())
      .then((data) => {
        setIndicators(data.data)
      })
      .catch((err) => {

        console.log(err)
      })
  }
  async function getTaskType() {
    await axios.post(`${rootUrl}/SettingsServlet?arg=task_types`, {
      company_id: 1
    })
      .then(function (response) {
        setTasks(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getMyScorecard = async () => {
    await axios.get(`${rootUrl}/ScorecardServlet?arg=my_scorecards&arg1=${userDetails?.name}`)
      .then((res) => {
        setMyScorecards(res.data.data.scorecards.filter((scr) => scr.username === "amaiello"))
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getDefaultPerspective = async () => {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=perspectives&arg1=SSC&arg2=${userDetails?.company_id}`)
      .then((res) => {
        setPerspectives(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getGoals = async () => {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=objectives_for_scorecard&scorecard_id=${scoreId}&company_id=${userDetails?.company_id}`)
      .then((res) => {
        setGoals(res.data.data)
      })
      .catch((error) => {

        console.log(error)
      })
  }
  const getKPI = async () => {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=kpis&scorecard_id=${scoreId}`)
      .then((res) => {
        setKPIs(res.data.data.filter((per) => per.delete_flag === undefined || per?.delete_flag === 0))
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getActions = async () => {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=tasks&scorecard_id=${scoreId}`)
      .then((res) => {
        setActions(res.data.data.filter((per) => per.delete_flag === undefined || per?.delete_flag === 0))
      })
      .catch((error) => {

        console.log(error)
      })
  }
  const getSpreadsheetTable = async () => {
    await axios.get(`${rootUrl}/SpreadsheetServlet?action=get&company=${userDetails?.company_id}&scorecard=${scoreId}&map_type=SSC`)
      .then((res) => {
        setTableData(res.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    //get company themedata
    getThemeData();
    //get company indicators
    getIndicator();
    //get Task Types
    getTaskType();
    //get my scorecards
    getMyScorecard();
    //get my perspectives
    getDefaultPerspective();
    getCompanyAssets();
  }, []);
  useEffect(() => {
    if (scoreId !== undefined) {
      getSpreadsheetTable();
      getGoals();
      getKPI();
      getActions();
      getGroups()
    }
  }, [scoreId])

  return (
    <SpreadsheetContext.Provider
      value={{
        themeData,
        indicators,
        tasks,
        scorecards,
        getGoals,
        getKPI,
        getActions,
        getDefaultPerspective,
        setScoreId,
        scoreId,
        groups,
        goalComments,
        actionComments,
        kpiComments,
        getGoalComments,
        getKPIComments,
        getActionComments,
        perspectives,
        setPerspectives,
        goals,
        setGoals,
        kpis,
        setKPIs,
        actions,
        setActions,
        type,
        assets,
        setType,
        tableData,
        getSpreadsheetTable
      }}
    >
      {children}
    </SpreadsheetContext.Provider>
  );
};

export default SpreadsheetContextProvider;
