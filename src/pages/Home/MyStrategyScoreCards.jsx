import React, { useState, useEffect, useContext } from "react";
import { rootUrl } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";
function MyStrategyScoreCards() {
  const {userDetails}=useContext(AuthContext);
  const [ObjectiveServlet, setObjectiveServlet] = useState([]);
  useEffect(() => {
    fetch(`${rootUrl}/ObjectiveServlet?action=get&arg=projects&arg1=${userDetails.name}`)
      .then((response) => response.json())
      .then((data) => {
        setObjectiveServlet(
          [
            ...new Map(data.data.map((item) => [item["type"], item])).values(),
          ].map((v) => ({ ...v, src: "/images/icondefault2.svg" }))
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="body">
      <div className="text-and-supporting-text12">
        <div className="text-and-supporting-text13">
          <div className="heading">My Strategy Scorecards</div>
        </div>
        <div className="button6">
          <div className="icon12">
            <div className="width-change-size-here11">
              <div className="ignore"></div>
              <div className="ignore"></div>
            </div>
            <div className="icon-wrapper-h">
              <div className="height-change-size-here8">
                <div className="ignore"></div>
                <div className="ignore"></div>
              </div>
              <img
                className="icon-wrapper"
                alt=""
                src="/images/iconwrapper31.svg"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="body3">
        <div className="frame-parent3">
          <div className="frame-parent4">
            <img className="frame-icon" alt="" src="/images/Frame970971.svg" />

            <div className="text36">Behind</div>
          </div>
          <div className="button7">
            <div className="icon">
              <img
                className="wrapper-icon22"
                alt=""
                src="/images/wrapper40.svg"
              />
            </div>
            <div className="text29">
              <div className="text36">View All</div>
            </div>
          </div>
          <div className="button7">
            <div className="icon">
              <img
                className="wrapper-icon22"
                alt=""
                src="/images/wrapper41.svg"
              />
            </div>
            <div className="text29">
              <div className="text36">Add New</div>
            </div>
          </div>
        </div>
        <div className="cta-group">
          {ObjectiveServlet.map((item, index) => (
            <div key={index}>
              <div className="cta3">
                <div className="icon">
                  <img className="icondefault" alt="" src={item.src} />
                </div>
                <div className="text-and-supporting-text14">
                  <div className="text41">{item.type}</div>
                  <div className="badge6">
                    <div className="badge5">
                      <div className="icon-wrapper11">
                        <img
                          className="wrapper-icon"
                          alt=""
                          src="/images/wrapper8.svg"
                        />
                      </div>
                      <div className="text24">Incomplete</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider">
                <img
                  className="line-stroke-icon"
                  alt=""
                  src="/images/line-stroke1.svg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider">
        <img
          className="line-stroke-icon"
          alt=""
          src="/images/line-stroke.svg"
        />
      </div>
      <div className="button4">
        <div className="arrow">
          <div className="width-change-size-here11">
            <div className="ignore"></div>
            <div className="ignore"></div>
          </div>
          <div className="icon-wrapper-h">
            <div className="height-change-size-here8">
              <div className="ignore"></div>
              <div className="ignore"></div>
            </div>
            <img
              className="icon-wrapper"
              alt=""
              src="/images/iconwrapper32.svg"
            />
          </div>
        </div>
        <div className="text29">
          <div className="text20">Scorecard Alignment</div>
        </div>
        <div className="arrow">
          <div className="width-change-size-here11">
            <div className="ignore"></div>
            <div className="ignore"></div>
          </div>
          <div className="icon-wrapper-h">
            <div className="height-change-size-here8">
              <div className="ignore"></div>
              <div className="ignore"></div>
            </div>
            <img
              className="icon-wrapper"
              alt=""
              src="/images/iconwrapper33.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStrategyScoreCards;
