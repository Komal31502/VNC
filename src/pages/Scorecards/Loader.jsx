import React from 'react';
import {IconButton, Skeleton } from "@mui/material";

const Loader = () => {
  return (
     <>
    {
      [...Array(5)].map((ele, ind) => {
        return (
          <div style={{ width: "100%" }} key={ind}>
            <div className="scoregroup6">
              <div className="scorecontent9">
                <div className="scorefolder-icon11">
                  <img
                    className="scorefolder-icon12"
                    alt=""
                    src={
                      "/images/scoreFolderClose.svg"
                    }
                  />
                </div>

                <div className="scoretext-and-supporting-text35">
                  <Skeleton animation={"wave"} variant="rounded" width={"250px"} height={18} />
                  <Skeleton animation={"wave"} variant="rounded" width={"350px"} height={16} sx={{ margin: "5px 0px" }} />
                </div>
                <div className="scoretabs1">
                  <div className="scoreavatar41">
                    <div className="scorebadge-anchor18">
                      <img
                        className="scorebadge-2-icon19"
                        alt=""
                        src="/images/scoreChevronDown.svg"
                      />
                    </div>
                    <div className="scoreaspect-ratio-keeper-addition33">
                      <div className="scoreaspect-ratio-keeper-rotated32"></div>
                    </div>
                  </div>
                  <div className="scorebutton56 snowMan" >
                    <div className="scoreicon63">
                      <IconButton
                        className="scoreicon-wrapper-h65"
                      

                      >
                        <img
                          className="scoreicon-wrapper82"
                          alt=""
                          src="/images/scoreSnowman.svg"
                        />
                      </IconButton>

                    </div>
                  </div>
                  <div
                    className="scorebutton58 snowMan"

                  >
                    <div className="scoreicon63">
                      <div className="scoreicon-wrapper-h65">
                        <img
                          className="scoreicon-wrapper82 chevron"
                          alt=""
                          src={

                            "/images/scoreChevronDown.svg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })
    }
  </>  )
}

export default Loader