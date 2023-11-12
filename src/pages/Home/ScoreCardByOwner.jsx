import React, { useState, useEffect, useContext } from "react";
import { rootUrl } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";

function ScoreCardByOwner() {
  const {userDetails}=useContext(AuthContext);
  const [budgetOwner, setBudgetOwner] = useState([]);
  useEffect(() => {
    fetch(`${rootUrl}/HomeDashboard?arg=budget_by_owner&arg1=${userDetails.name}&arg2=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setBudgetOwner(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="body">
      <div className="text-and-supporting-text2">
        <div className="text-and-supporting-text6">
          <div className="heading">Scorecard Budget by Owner</div>
          <div className="supporting-text8">Last 60 days</div>
        </div>
      </div>
      <div className="body4">
        {Object.values(budgetOwner).map((item, index) => (
          <div key={index}>
            <div className="scorecard-owner">
              <div className="avatar3">
                <img
                  className="avatar-placeholder-change-i"
                  alt=""
                  src="/images/avatarplaceholder--change-image-here5@2x.png"
                />

                <div className="aspect-ratio-keeper-addition3">
                  <div className="aspect-ratio-keeper-rotated"></div>
                </div>
                <div className="width-change-size-here8">
                  <div className="ignore"></div>
                  <div className="ignore"></div>
                </div>
              </div>
              <div className="text-and-supporting-text1">
                <div className="frame-parent5">
                  <div className="text-parent">
                    <div className="text49">{item.owner}</div>
                    <div className="badge12">
                      <div className="badge13">
                        <div className="icon-wrapper11">
                          <img
                            className="wrapper-icon"
                            alt=""
                            src="/images/wrapper39.svg"
                          />
                        </div>
                        <div className="text24">{item.worst_status}</div>
                      </div>
                    </div>
                  </div>
                  <div className="icon-wrapper-parent4">
                    <div className="icon">
                      <img
                        className="wrapper-icon14"
                        alt=""
                        src="/images/wrapper10.svg"
                      />
                    </div>
                    <div className="text16">{item.title}</div>
                  </div>
                </div>
                <div className="text-and-supporting-text20">
                  <div className="text17">
                    {item.expense}K / {item.budget}K
                  </div>
                  <div className="owner-child"></div>
                  <div className="text52">{item.percent_spent}% Spent</div>
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
              src="/images/iconwrapper34.svg"
            />
          </div>
        </div>
        <div className="text29">
          <div className="text20">Load More</div>
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
              src="/images/iconwrapper35.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreCardByOwner;
