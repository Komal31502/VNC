import React, { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Objective from "../Objective/objective";
import { rootUrl } from "../../Constants";
import { AuthContext } from "../../context/AuthContext";
function FocusAreas() {
  const {userDetails}=useContext(AuthContext);
  const [focusAreas, setfocusAreas] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetch(`${rootUrl}/HomeDashboard?arg=focus_areas&arg1=${userDetails.name}&arg2=${userDetails.company_id}`)
      .then((response) => response.json())
      .then((data) => {
        setfocusAreas(data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  function handleShow() {
    setShow(true);
  }
  return (
    <div className="body">
      <div className="text-and-supporting-text2">
        <div className="heading">Today’s Focus Areas</div>
      </div>
      <div className="cta-parent">
        {focusAreas.map((item, index) => (
          <div key={index} className="cta" onClick={() => handleShow(true)}>
            <div className="text-and-supporting-text3">
              <div className="text23">{item.title}</div>
              <div className="badge">
                <div className="badge1">
                  <div className="icon-wrapper11">
                    <img
                      className="wrapper-icon"
                      alt=""
                      src="/images/wrapper1.svg"
                    />
                  </div>
                  <div className="text24">{item.status}</div>
                </div>
              </div>
            </div>
            <div className="owner">
              <div className="avatar-parent">
                <div className="avatar">
                  <img
                    className="avatar-placeholder-change-i"
                    alt=""
                    src="/images/avatarplaceholder--change-image-here9@2x.png"
                  />

                  <div className="aspect-ratio-keeper-addition">
                    <div className="aspect-ratio-keeper-rotated"></div>
                  </div>
                  <div className="width-change-size-here8">
                    <div className="ignore"></div>
                    <div className="ignore"></div>
                  </div>
                </div>
                <div className="text16">{item.oname}</div>
              </div>
              <div className="owner-child"></div>
              <div className="icon-wrapper-parent">
                <div className="icon">
                  <img
                    className="wrapper-icon14"
                    alt=""
                    src="/images/wrapper15.svg"
                  />
                </div>
                <div className="supporting-text3">{item.type}</div>
              </div>
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
              src="/images/iconwrapper19.svg"
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
              src="/images/iconwrapper25.svg"
            />
          </div>
        </div>
      </div>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text39">Improve Systems</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Objective />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default FocusAreas;
