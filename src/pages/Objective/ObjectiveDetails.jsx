import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { rootUrl } from "../../Constants";
function ObjectiveDetails() {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    fetch(`${rootUrl}/ObjectiveDetailServlet?arg=1014`)
      .then((response) => response.json())
      .then((data) => {
        setDetails(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div>
      {" "}
      <div className="objDetcontainer">
        <div>
          <div>
            <div>
              <b className="objDetb">{details.scheduled_completion}%</b>
              <div>
                <ProgressBar
                  className="progress-warning"
                  now={details.scheduled_completion}
                  animated
                />
              </div>
              <div>At Risk</div>
            </div>
          </div>
          <div className="objDetline-chart">
            <img alt="" src="/images/LineChart.svg" />
          </div>

          <div className="objDetframe-group">
            <div className="objDetorder-details-parent">
              <div className="objDetorder-details">Owner</div>
              <div className="objDetavatar-parent">
                <div className="objDetavatar2">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here3@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition4">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
                <div className="objDetorder-details1">
                  {(details.tasks | [])[0]?.oname}
                </div>
              </div>
            </div>
            <div className="objDetorder-details-parent">
              <div className="objDetorder-details">Team</div>
              <div className="objDetavatar-group">
                <div className="objDetavatar2">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here4@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition4">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
                <div className="objDetavatar2">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here5@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition4">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
                <div className="objDetavatar2">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here5@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition4">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
                <div className="objDetavatar6">
                  <div className="objDetwrapper22">
                    <div className="objDetus1">+3</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="objDetorder-details-parent">
              <div className="objDetorder-details">Time Frame</div>
              <div className="objDetorder-details4">
                May 8 2023 20 days ago - July 8 2023 36 days to go
              </div>
            </div>
            <div className="objDetorder-details-parent">
              <div className="objDetorder-details">Contributes to</div>
              <div className="objDetorder-details4">
                Goal: Provide customers with better products
              </div>
            </div>
            <div className="objDetorder-details-parent1">
              <div className="objDetorder-details">Description</div>
              <div className="objDetorder-details4">
                {(details.tasks | [])[0]?.description}
              </div>
            </div>
          </div>
        </div>
        <div className="objDetbody1">
          <div className="objDetcommentitem1">
            <div className="objDetsize-adjuster1">
              <div className="objDetignore134"></div>
              <div className="objDetignore134"></div>
            </div>
            <div className="objDetwrapper23">
              <div className="objDetavatar-wrapper1">
                <div className="objDetavatar7">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here5@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition8">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
              </div>
              <div className="objDetcomment-body1">
                <div className="objDetmeta-fields1">
                  <div className="objDettext40">
                    <div className="objDettext56">Vinh Bui</div>
                  </div>
                  <div className="objDettime1">
                    <div className="objDettext41">1 day ago</div>
                  </div>
                  <div className="objDeticon-wrapper65">
                    <img
                      className="objDetwrapper-icon3"
                      alt=""
                      src="/images/wrapper3.svg"
                    />
                  </div>
                  <div className="objDeticon-wrapper66">
                    <img
                      className="objDetwrapper-icon3"
                      alt=""
                      src="/images/wrapper4.svg"
                    />
                  </div>
                </div>
                <div className="objDetcomment1">
                  <div className="objDettext58">
                    Lorem ipsum dolor sit amet, vince adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                  <div className="objDetmin-width-change-size-here2">
                    <div className="objDetignore134"></div>
                    <div className="objDetignore134"></div>
                  </div>
                </div>
                <div className="objDetactions1">
                  <div className="objDetlike1">
                    <div className="objDeticon15">
                      <div className="objDetwidth-change-size-here51">
                        <div className="objDetignore134"></div>
                        <div className="objDetignore134"></div>
                      </div>
                      <div className="objDeticon-wrapper-h32">
                        <div className="objDetheight-change-size-here51">
                          <div className="objDetignore134"></div>
                          <div className="objDetignore134"></div>
                        </div>
                        <img
                          className="objDeticon-wrapper38"
                          alt=""
                          src="/images/iconwrapper30.svg"
                        />
                      </div>
                    </div>
                    <div className="objDettext40">
                      <div className="objDettext59">0</div>
                    </div>
                  </div>
                  <div className="objDetlike1">
                    <div className="objDeticon15">
                      <div className="objDetwidth-change-size-here51">
                        <div className="objDetignore134"></div>
                        <div className="objDetignore134"></div>
                      </div>
                      <div className="objDeticon-wrapper-h32">
                        <div className="objDetheight-change-size-here51">
                          <div className="objDetignore134"></div>
                          <div className="objDetignore134"></div>
                        </div>
                        <img
                          className="objDeticon-wrapper38"
                          alt=""
                          src="/images/iconwrapper31.svg"
                        />
                      </div>
                    </div>
                    <div className="objDettext40">
                      <div className="objDettext59">0</div>
                    </div>
                  </div>
                  <div className="objDettext40">
                    <div className="objDettext59">Reply to</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="objDetdivider">
            <img
              className="objDetline-stroke-icon1"
              alt=""
              src="/images/line-stroke1.svg"
            />
          </div>
          <div className="objDetcommentitem1">
            <div className="objDetsize-adjuster1">
              <div className="objDetignore134"></div>
              <div className="objDetignore134"></div>
            </div>
            <div className="objDetwrapper23">
              <div className="objDetavatar-wrapper1">
                <div className="objDetavatar7">
                  <img
                    className="objDetavatar-placeholder-change-i4"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here5@2x.png"
                  />

                  <div className="objDetaspect-ratio-keeper-addition8">
                    <div className="objDetaspect-ratio-keeper-rotated4"></div>
                  </div>
                </div>
              </div>
              <div className="objDetcomment-body1">
                <div className="objDetmeta-fields1">
                  <div className="objDettext40">
                    <div className="objDettext56">Vinh Bui</div>
                  </div>
                  <div className="objDettime1">
                    <div className="objDettext41">1 day ago</div>
                  </div>
                  <div className="objDeticon-wrapper66">
                    <img
                      className="objDetwrapper-icon3"
                      alt=""
                      src="/images/wrapper3.svg"
                    />
                  </div>
                  <div className="objDeticon-wrapper65">
                    <img
                      className="objDetwrapper-icon3"
                      alt=""
                      src="/images/wrapper4.svg"
                    />
                  </div>
                </div>
                <div className="objDetcomment1">
                  <div className="objDettext58">
                    Lorem ipsum dolor sit amet, vince adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                  <div className="objDetmin-width-change-size-here2">
                    <div className="objDetignore134"></div>
                    <div className="objDetignore134"></div>
                  </div>
                </div>
                <div className="objDetactions1">
                  <div className="objDetlike1">
                    <div className="objDeticon15">
                      <div className="objDetwidth-change-size-here51">
                        <div className="objDetignore134"></div>
                        <div className="objDetignore134"></div>
                      </div>
                      <div className="objDeticon-wrapper-h32">
                        <div className="objDetheight-change-size-here51">
                          <div className="objDetignore134"></div>
                          <div className="objDetignore134"></div>
                        </div>
                        <img
                          className="objDeticon-wrapper38"
                          alt=""
                          src="/images/iconwrapper30.svg"
                        />
                      </div>
                    </div>
                    <div className="objDettext40">
                      <div className="objDettext59">0</div>
                    </div>
                  </div>
                  <div className="objDetlike1">
                    <div className="objDeticon15">
                      <div className="objDetwidth-change-size-here51">
                        <div className="objDetignore134"></div>
                        <div className="objDetignore134"></div>
                      </div>
                      <div className="objDeticon-wrapper-h32">
                        <div className="objDetheight-change-size-here51">
                          <div className="objDetignore134"></div>
                          <div className="objDetignore134"></div>
                        </div>
                        <img
                          className="objDeticon-wrapper38"
                          alt=""
                          src="/images/iconwrapper31.svg"
                        />
                      </div>
                    </div>
                    <div className="objDettext40">
                      <div className="objDettext59">0</div>
                    </div>
                  </div>
                  <div className="objDettext40">
                    <div className="objDettext59">Reply to</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="objDetbody2">
        <div className="objDetcommentcomment-editor">
          <div className="objDetavatar7">
            <img
              className="objDetavatar-placeholder-change-i4"
              alt=""
              src="/images/avatarplaceholder--change-image-here5@2x.png"
            />

            <div className="objDetaspect-ratio-keeper-addition8">
              <div className="objDetaspect-ratio-keeper-rotated4"></div>
            </div>
          </div>
          <div className="objDetcomment-form1">
            <div className="objDettextarea1">
              <div className="objDetplaceholder4">
                <textarea
                  placeholder="Leave a comment"
                  className="objDetplaceholder4"
                />
              </div>
              <div className="objDetword-count2">
                <div className="objDettext68">0 / 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ObjectiveDetails;
