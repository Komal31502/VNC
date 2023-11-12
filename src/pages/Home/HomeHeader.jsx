import React from "react";

function HomeHeader() {
  return (
    <div className="page-header">
      <div className="breadcrumbs">
        <div className="tabs">
          <div className="breadcrumb-button-base">
            <img className="home-line-icon" alt="" src="/images/homeline.svg" />
          </div>
          <img
            className="chevron-right-icon"
            alt=""
            src="/images/chevronright.svg"
          />

          <div className="breadcrumb-button-base1">
            <div className="text17">Settings</div>
          </div>
          <img
            className="chevron-right-icon"
            alt=""
            src="/images/chevronright.svg"
          />

          <div className="breadcrumb-button-base1">
            <div className="text17">...</div>
          </div>
          <img
            className="chevron-right-icon"
            alt=""
            src="/images/chevronright.svg"
          />

          <div className="breadcrumb-button-base3">
            <div className="text17">Another link</div>
          </div>
          <img
            className="chevron-right-icon3"
            alt=""
            src="/images/chevronright.svg"
          />

          <div className="breadcrumb-button-base4">
            <div className="text20">Team</div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="text-and-supporting-text1">
          <b className="text21">Home</b>
          <div className="supporting-text1">Welcome back, Olivia!</div>
        </div>
        <div className="button-parent">
          <div className="button1">
            <div className="icon">
              <img
                className="wrapper-icon1"
                alt=""
                src="/images/wrapper25.svg"
              />
            </div>
          </div>
          <div className="button1">
            <div className="icon">
              <img
                className="wrapper-icon1"
                alt=""
                src="/images/wrapper27.svg"
              />
            </div>
          </div>
          <div className="button1">
            <div className="icon">
              <img
                className="wrapper-icon1"
                alt=""
                src="/images/wrapper38.svg"
              />
            </div>
          </div>
        </div>
        <div className="input-dropdown">
          <div className="input-with-label">
            <div className="label">Search</div>
            <div className="input">
              <div className="content1">
                <img
                  className="home-line-icon"
                  alt=""
                  src="/images/searchlg.svg"
                />

                <div className="text22">Search</div>
              </div>
            </div>
          </div>
          <div className="hint-text">This is a hint text to help user.</div>
        </div>
      </div>
      <img className="divider-icon" alt="" src="/images/divider.svg" />
    </div>
  );
}

export default HomeHeader;
