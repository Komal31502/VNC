import React, { useState, useContext } from "react";
import "./MyScorecards.css";
import AddNew from "../../components/MyScorecards/AddNew/AddNew";
import { Avatar, AvatarGroup, Button, Collapse, IconButton, Skeleton } from "@mui/material";
import ScoreCardActions from "../../components/MyScorecards/ScoreCardActions/ScoreCardActions";
import RecentHistory from "../../components/MyScorecards/RecentHistory/RecentHistory";
import Members from "../../components/MyScorecards/Members/Members";
import { ScorecardContext } from "../../context/ScorecardContext";
import { useNavigate } from "react-router-dom";
import Foundation from "../../components/Foundation/Foundation";
import Activity from "../../components/Activity/Activity";
import MainEmpty from "../../components/MyScorecards/ShareScorecard/MainEmpty/MainEmpty";
import Groups from "../../components/Groups/Groups";
import Loader from "./Loader";
import Scorecards from "../../components/Scorecards/Scorecards";

function MyScorecards() {
  const navigate = useNavigate();
  const {assets, company, history, loader, members}=useContext(ScorecardContext);
  const [collapse, setCollapse] = useState(false);
  const [share, setShare] = useState(false);
  const [scoreData, setScore] = useState();
  const [activeIndex, setActiveIndex] = useState(localStorage.getItem("scorecard") === null?-1:assets?.groups?.map((grp)=> grp.name)?.indexOf(assets?.groups?.filter((grp)=> grp?.scorecards.some((scr) => scr.id === Number(localStorage.getItem("scorecard"))))[0]?.name));
  const [selected, setSelected] = useState(-1);
  const [show, setShow] = useState(null);
  const add = Boolean(show);
  const [scoreaction, setScoreAction] = useState(null);
  const score = Boolean(scoreaction);
  const [recent, setRecent] = useState(null);
  const action = Boolean(recent);
  const popup = action ? "simple-popover" : undefined;
  const [disMem, setDisMem] = useState(null);
  const member = Boolean(disMem);
  const popover = member ? "simple-popover" : undefined;

  return (
    <div className="scoreContainer">
      <div className="scorecontent7">
        <div className="scoretext-and-supporting-text33">
          <b className="scoretext110">My Scorecards</b>
        </div>
        <div className="scorebutton-group">
          <button className="scorebutton53">
            <div className="scoreicon-wrapper84">
              <img
                className="scorewrapper-icon28"
                alt=""
                src="/images/wrapper25.svg"
              />
            </div>
          </button>
          <button className="scorebutton53">
            <div className="scoreicon-wrapper84">
              <img
                className="scorewrapper-icon28"
                alt=""
                src="/images/wrapper8.svg"
              />
            </div>
          </button>
          <button className="scorebutton53">
            <div className="scoreicon-wrapper84">
              <img
                className="scorewrapper-icon28"
                alt=""
                src="/images/wrapper38.svg"
              />
            </div>
          </button>
        </div>
        <div className="scoreinput-dropdown">
          <div className="scoreinput-with-label">
            <div className="scorelabel">Search</div>
            <div className="scoreinput">
              <div className="scorecontent8">
                <img
                  className="scoresearch-lg-icon"
                  alt=""
                  src="/images/searchlg.svg"
                />

                <div className="scoretext113">Search</div>
              </div>
            </div>
          </div>
          <div className="scorehint-text">
            This is a hint text to help user.
          </div>
        </div>
        <img className="scoredivider-icon" alt="" src="/images/divider.svg" />
      </div>
      <div className="scorecta-container">
        <div className="scoreavatar-parent9">
          <div className="scoreavatar40">
            {
              loader ?
                <Skeleton variant="rounded" width={64} height={64} /> :
                <img
                  className="scoreavatar-placeholder-change-i32"
                  alt=""
                  src="/images/scoreMain.svg"
                />
            }
          </div>
          <div className="scoretext-and-supporting-text34">
            <div className="scoretext111">
              {
                loader ?
                  <Skeleton animation={"wave"} variant="rounded" width={"200px"} height={24} /> :
                  <div className="scoretext114">{company[0]?.name}</div>
              }
            </div>
            <div className="scoresupporting-text-container">
              {
                loader ?
                  <Skeleton animation={"wave"} variant="rounded" width={"300px"} height={20} sx={{ margin: "5px 0px" }} /> :
                  <div className="scoresupporting-text18">
                    {company[0]?.description}
                  </div>
              }
            </div>
          </div>
        </div>
        <div className="scoreframe-group">
          <div>
            <AvatarGroup max={4}
              sx={{
                '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 15 },
              }}

            >
              {
                members.map((obj, index) =>
                  <Avatar key={index} >{obj.first_name.charAt(0).toUpperCase() + "" + obj.last_name.charAt(0).toUpperCase()}</Avatar>
                )
              }
            </AvatarGroup>
          </div>
          <div>
            <Button
              variant="contained"
              size="small"
              disableElevation
              sx={{
                textTransform: "none",
                cursor: "pointer",
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #407FFF",
                background: "#407FFF",
                fontSize: "16px"
              }}
              aria-controls={add ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={add ? "true" : undefined}
              onClick={(e) => setShow(e.currentTarget)}
            >
              Add New
            </Button>
            <AddNew show={show} add={add} setShow={setShow} />
          </div>
        </div>
      </div>
      <div className="scoreCanvas">
        <div className="scorecanvas1" style={{ width: collapse ? "98%" : "70%" }}>
          <div className="scorerow1">
            {
              loader ?
                <Loader />
                :
                <>
                  {
                    assets?.groups?.map((group, index) => {
                      return (
                        <div className="myScorecard-container" key={index}
                        >
                          <Groups
                            index={index}
                            setActiveIndex={setActiveIndex}
                            activeIndex={activeIndex}
                            group={group}
                          />
                          <Collapse in={activeIndex === index || group?.scorecards.some((scr) => scr.id == Number(localStorage.getItem("scorecard")))}>
                            <div className="scorecards-wrapper2">
                              {group?.scorecards?.map((scr, id) => {
                                return (
                                  <div className="scorecomponent-19" key={id} style={{ background: (activeIndex===index && selected === id || Number(localStorage.getItem("scorecard")) == scr.id) ? "#b4e0e0" : "", cursor: "pointer" }} 
                                  onClick={() => 
                                    {
                                      if (localStorage.getItem("scorecard") !== null) {
                                        localStorage.removeItem("scorecard");
                                        setSelected(id);
                                    }
                                    setSelected(id)
                                    }
                                   }>
                                    <div className="scorecardInfo" onClick={() => navigate("/spreadsheet", { state: { score: scr } })}>
                                      <img
                                        className="scoreicondefault3"
                                        alt=""
                                        src="/images/scoreStrategyMap.svg"
                                        onClick={() => navigate("/spreadsheet", { state: { score: scr } })}
                                      />
                                      <div className="scoreDesc">
                                        <div className="scoretext116">{scr.name}</div>
                                        <div className="scoresupporting-text19">
                                          {scr.description}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="scoreframe-group">
                                      <div className="scoreframe-container">
                                        <div className="scoreavatar-parent10">
                                          <div className="scoreavatar41">
                                            <IconButton
                                              className="scoreavatar41"
                                              aria-describedby={popover}
                                              onClick={(e) => {
                                                setDisMem(e.currentTarget);
                                              
                                              }
                                              }
                                            >


                                              {
                                                scr?.team?.length === 0 ?
                                                  <></> :
                                                  <AvatarGroup max={3} sx={{
                                                    '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 15 }
                                                  }}>
                                                    {
                                                      scr?.team?.filter((score, i, arr) => arr.map((ele) => ele.id).indexOf(score.id) === i && score.permission!=="Revoked").map((obj, ind) =>
                                                        <Avatar key={ind}>{obj.username.charAt(0).toUpperCase() + "" + obj.username.charAt(1).toUpperCase()}
                                                          {
                                                            obj.role_name === "Power User" ?
                                                              <div className="powerUser">
                                                                <img src="/images/power.svg" alt="Power User" />
                                                              </div> : <></>
                                                          }
                                                        </Avatar>
                                                      )
                                                    }
                                                  </AvatarGroup>
                                              }

                                            </IconButton>
                                            {activeIndex===index && selected === id ? (
                                              <Members
                                                id={popover}
                                                recent={disMem}
                                                setRecent={setDisMem}
                                                action={member}
                                                scoreMem={scr?.team}
                                              />
                                            ) : (
                                              <></>
                                            )}

                                            <div className="scoreaspect-ratio-keeper-addition33">
                                              <div className="scoreaspect-ratio-keeper-rotated32"></div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="scoreframe-container">
                                        <div className="scoreicon-wrapper-h65">
                                          {scr?.team.length !== 0 ?
                                            <img
                                              style={{ width: "16px", height: "16px" }}
                                              alt=""
                                              src="/images/scoreUsers.svg"
                                              onClick={(e) => {
                                                setDisMem(e.currentTarget);
                                              
                                              }
                                              }

                                            /> :
                                            <img
                                              style={{ width: "16px", height: "16px" }}
                                              alt=""
                                              src="/images/scoreUsers.svg"
                                              onClick={() => { setScore(scr); setShare(true); }}
                                            />}

                                        </div>
                                        <div className="scorebutton58 snowMan">
                                          <div className="scoreicon63">
                                            <IconButton
                                              className="scoreicon-wrapper-h65"
                                              aria-describedby={popup}
                                              onClick={(e) => {
                                                setRecent(e.currentTarget);
                                              
                                              }}
                                            >
                                              <img
                                                className="scoreicon-wrapper82"
                                                alt=""
                                                src="/images/scoreHistory.svg"
                                              />
                                            </IconButton>
                                            {activeIndex===index && selected === id ? (
                                              <RecentHistory
                                                id={popup}
                                                recent={recent}
                                                setRecent={setRecent}
                                                action={action}
                                                data={history.filter(
                                                  (obj) => obj.project_id === scr.id
                                                )}
                                              />
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="scorebadge68">
                                        <div className="scorebadge69">
                                          <div className="scoretext119">0%</div>
                                        </div>
                                      </div>
                                      <div className="scorebutton58 snowMan">
                                        <div className="scoreicon63">
                                          <IconButton
                                            className="scoreicon-wrapper-h65"
                                            aria-controls={
                                              score ? "basic-menu" : undefined
                                            }
                                            aria-haspopup="true"
                                            aria-expanded={
                                              score ? "true" : undefined
                                            }
                                            onClick={(e) => {
                                              setScoreAction(e.currentTarget);
                                            
                                            }}
                                          >
                                            <img
                                              className="scoreicon-wrapper82"
                                              alt=""
                                              src="/images/scoreSnowman.svg"
                                            />
                                          </IconButton>

                                          { activeIndex===index && selected === id ? (
                                            <ScoreCardActions
                                              scoreaction={scoreaction}
                                              score={score}
                                              setScoreAction={setScoreAction}
                                              data={scr}

                                            />
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                  </div>
                                );
                              })}
                            </div>
                          </Collapse>
                        </div>
                      );
                    })
                  }
                </>
            }
            <Scorecards />
          </div>
          <div className="collapseIcon" onClick={() => setCollapse(!collapse)}>
            <img
              src="/images/Collapsebutton.svg"
              alt="collapse"
              style={{ transform: collapse ? "rotate(180deg)" : "none" }}
            />
          </div>
        </div>
        <div
          className="scoresidebar"
          style={{ display: collapse ? "none" : "block" }}
        >
          <Foundation />
          <Activity />
        </div>
      </div>
      <MainEmpty share={share} setShare={setShare} scorecardData={scoreData} />
    </div>
  );
}
export default MyScorecards;
