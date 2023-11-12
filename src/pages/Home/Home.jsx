import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FocusAreas from "./FocusAreas";
import GoalsAlert from "./GoalsAlert";
import GoalsCompletion from "./GoalsCompletion";
import GoalsCompletionByOwner from "./GoalsCompletionByOwner";
import MyStrategyScoreCards from "./MyStrategyScoreCards";
import ScoreCardByOwner from "./ScoreCardByOwner";
import HomeHeader from "./HomeHeader";

function Home() {
  return (
    <div className="main">
      <HomeHeader />
      <div className="section">
        <div className="container">
          <FocusAreas />
          <GoalsCompletion />
          <GoalsCompletionByOwner />
        </div>
        <div className="container1">
          <MyStrategyScoreCards />
          <ScoreCardByOwner />
          <div className="row-parent">
            <GoalsAlert />
            <div className="ad">
              <img
                className="ad-child"
                alt=""
                src="/images/group-9704561.svg"
              />

              <img
                className="image-36-icon"
                alt=""
                src="/images/image-36@2x.png"
              />

              <img
                className="image-35-icon"
                alt=""
                src="/images/image-35@2x.png"
              />

              <b className="heading7">Live Training</b>
              <div className="supporting-text19">
                <p className="get-the-most">Get the most</p>
                <p className="get-the-most">from VNCDesigner</p>
              </div>
              <div className="button11">
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
                      src="/images/iconwrapper14.svg"
                    />
                  </div>
                </div>
                <div className="text29">
                  <div className="text20">Book Training</div>
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
                      src="/images/iconwrapper36.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
