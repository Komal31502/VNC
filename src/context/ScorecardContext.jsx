import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { rootUrl } from "../Constants";
import { AuthContext } from "./AuthContext";



export const ScorecardContext = createContext(null);

const ScorecardContextProvider = ({ children }) => {
  const {userDetails}=useContext(AuthContext);
  const [update, setUpdate] = useState(0);
  const [company, setCompany] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [members, setMembers] = useState([]);
  const [history, setHistory] = useState([]);
  const [assets,setAssets]=useState([]);
  const [scorecards,setScorecards]=useState([]);
  const [loader, setLoader] = useState(true);
  async function getCompanyDetails() {
    await fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=company&company_id=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setCompany(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async function getCoreValues() {
    await fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=values&arg1=${userDetails.name}`)
      .then((response) => response.json())
      .then((data) => {
        setCoreValues(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  const getMembers = async () => {
    await axios.get(`${rootUrl}/SettingsServlet?arg=users&user_name=${userDetails.name}&company_id=${userDetails.company_id}`)
      .then(function (response) {
        setMembers(Object.values(response.data.data.users).filter((obj) => obj.id !== 2));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function getCompanyAssets()
  {
    await axios.get(`${rootUrl}/SharingServlet?arg=groups_scorecards&company_id=${userDetails.company_id}&user_name=${userDetails.name}`)
    .then(function (response) {
      setLoader(false)
      setAssets(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  async function getHistory() {
    await fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=history&arg1=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setHistory(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async function postHistory(record) {
    await axios
      .post(`${rootUrl}/ObjectiveServlet?action=create&arg=log`, record)
      .then(function (response) {
        setUpdate(response.data.data[0].new_log_entry_id)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  async function getScorecards() {
    await axios.get(`${rootUrl}/ObjectiveServlet?action=get&arg=maps&arg1=${userDetails.company_id}`)
    .then(function (response) {
      setScorecards(response.data.data.filter((scr)=> scr.created_by===userDetails.name));
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  useEffect(() => {
    //get company details of user
    getCompanyDetails();
    //get core values of the user
    getCoreValues();
    //get Company Members
    getMembers();
   //get Scorecards
   getScorecards();
  }, []);
  useEffect(() => {
    //get all Scorecard History for this user
    getHistory();
    //get all company assets and scorecards
    getCompanyAssets();
    //get All Scorecards
    getScorecards();
  }, [update]);
  return (
    <ScorecardContext.Provider
      value={{
        company,
        setUpdate,
        history,
        coreValues,
        members,
        loader,
        postHistory,
        assets,
        scorecards
      }}
    >
      {children}
    </ScorecardContext.Provider>
  );
};

export default ScorecardContextProvider;
