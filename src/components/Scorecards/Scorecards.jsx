import React, { useContext, useState } from 'react'
import RecentHistory from '../MyScorecards/RecentHistory/RecentHistory';
import { Avatar, AvatarGroup, IconButton } from '@mui/material';
import ScoreCardActions from '../MyScorecards/ScoreCardActions/ScoreCardActions';
import Members from '../MyScorecards/Members/Members';
import { useNavigate } from 'react-router-dom';
import { ScorecardContext } from '../../context/ScorecardContext';
import MainEmpty from '../MyScorecards/ShareScorecard/MainEmpty/MainEmpty';

const Scorecards = ({}) => {
    const navigate=useNavigate();
    const {scorecards,history}=useContext(ScorecardContext);
    const [active, setActive] = useState(null);
    const [selected, setSelected] = useState(-1);
    const [scoreaction, setScoreAction] = useState(null);
    const score = Boolean(scoreaction);
    const [recent, setRecent] = useState(null);
    const action = Boolean(recent);
    const popup = action ? "simple-popover" : undefined;
    const [disMem, setDisMem] = useState(null);
    const member = Boolean(disMem);
    const popover = member ? "simple-popover" : undefined;
    const [scoreData, setScore] = useState();
    const [share, setShare] = useState(false);
  return (
    <>
    <div className="scorecards-wrapper2">
    {scorecards.filter((scr)=> !scr.group_id)?.map((scr, id) => {
        return (
          <div className="scorecomponent-19" key={id} style={{ background: (selected === scr.id || Number(localStorage.getItem("scorecard")) == scr.id) ? "#b4e0e0" : "", cursor: "pointer" }} onClick={() => setSelected(scr.id)}>
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
                        setActive(
                          active === id ? null : id
                        );
                      }
                      }
                    >
                      <AvatarGroup max={3} sx={{
                        '& .MuiAvatar-root': { width: 32, height: 32, fontSize: 15 }
                      }}>

                        {
                          scr?.team?.length === 0 ?
                            <></> :
                            scr?.team?.filter((score, i, arr) => arr.map((ele) => ele.id).indexOf(score.id) === i).map((obj, ind) =>
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
                    </IconButton>
                    {active === id ? (
                      <Members
                        id={popover}
                        recent={disMem}
                        setRecent={setDisMem}
                        action={member}
                        scoreMem={scr?.team}
                      />  ) : (
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
                        setActive(
                            active === id ? null : id
                          );
                      }
                      }

                    /> :
                    <img
                      style={{ width: "16px", height: "16px" }}
                      alt=""
                      src="/images/scoreUsers.svg"
                      onClick={() => { setScore(scr);  setShare(true);}}
                    />}

                </div>
                <div className="scorebutton58 snowMan">
                  <div className="scoreicon63">
                    <IconButton
                      className="scoreicon-wrapper-h65"
                      aria-describedby={popup}
                      onClick={(e) => {
                        setRecent(e.currentTarget);
                        setActive(
                          active === id ? null : id
                        );
                      }}
                    >
                      <img
                        className="scoreicon-wrapper82"
                        alt=""
                        src="/images/scoreHistory.svg"
                      />
                    </IconButton>
                    {active === id ? (
                      <RecentHistory
                        id={popup}
                        recent={recent}
                        setRecent={setRecent}
                        action={action}
                        data={history.filter(
                          (obj) => obj.project_id === scr.id
                        )}
                      /> ) : (
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
                      setActive(active === id ? null : id);
                    }}
                  >
                    <img
                      className="scoreicon-wrapper82"
                      alt=""
                      src="/images/scoreSnowman.svg"
                    />
                  </IconButton>
                  {active === id ? (
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
   <MainEmpty share={share} setShare={setShare} scorecardData={scoreData} />
   </>
  )
}

export default Scorecards;