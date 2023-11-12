import React, { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./MainEmpty.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Toast, ToastContainer } from "react-bootstrap";
import { FormControl, IconButton, InputLabel, MenuItem, Select, Switch } from "@mui/material";
import MemberList from "../MembersList/MemberList";
import axios from "axios";
import { ScorecardContext } from "../../../../context/ScorecardContext";
import { rootUrl } from "../../../../Constants";

const MainEmpty = ({ share, setShare, scorecardData }) => {
  const { postHistory, members } = useContext(ScorecardContext);
  const [invite, setInvite] = useState(false);
  const [shareMem, setShareMem] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [show, setShow] = useState(false);
  const [role,setRole]=useState({
    bool:false,
    type:"Read Only"
  });
  const [shareMess, setShareMess] = useState({
    active: false,
    revoke: false
  });
  const toggleShare = () => { shareMess?.active ? setShareMess((prev) => ({ ...prev, active: false })) : setShareMess((prev) => ({ ...prev, revoke: false })) }
  const handleClose = () => { setShare(false); setFilterData([]); setShow(false) }

  const filteredData = (event) => {
    if (event.target.value !== "")
      setFilterData(shareMem.filter((mem) => (mem?.first_name?.toLowerCase().includes(event.target.value.toLowerCase()) ||
        mem?.email_address?.toLowerCase().includes(event.target.value.toLowerCase()))
      )
      );
    else
      setFilterData([]);
  }

  const handleShare = async (event) => {
    if (event.target.checked) {
      setRole((prev)=> ({...prev,bool:true}))
      await axios
        .post(`${rootUrl}/ObjectiveServlet?action=share_scorecard_with_company`, {
          scorecard_id: scorecardData?.id,
          company_id: 1,
          role_name: "Reviewer",
          permission: "Active"
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "share",
            object_type: "scorecard",
            description: `${scorecardData?.name} scorecard was shared with entire company`,
            status: "New",
            object_id: scorecardData?.id,
            project_id: scorecardData?.id
          })
          setShareMess((prev) => ({ ...prev, active: true }));
          setFilterData([]);
          setShow(false);
          setRole((prev)=> ({...prev,bool:true}))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      await axios
        .post(`${rootUrl}/ObjectiveServlet_Dev?action=unshare_scorecard_with_company`, {
          scorecard_id: scorecardData?.id,
          company_id: 1,
        })
        .then(function (response) {
          postHistory({
            date_recorded: new Date().getTime(),
            date_updated: new Date().getTime(),
            user_id: "amaiello",
            transaction_type: "share",
            object_type: "scorecard",
            description: `${scorecardData?.name} scorecard was unshared with entire company`,
            status: "New",
            object_id: scorecardData?.id,
            project_id: scorecardData?.id
          })
          setRole((prev)=> ({...prev,bool:false}))
          setShareMess((prev) => ({ ...prev, revoke: true }))
          setFilterData([]);
          setShow(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
 const handleRole=async (event) => {
    await axios
      .post(`${rootUrl}/ObjectiveServlet_Dev?action=update_project_users_for_company`, {
        scorecard_id: scorecardData?.id,
        company_id: 1,
        role_name: event.target.value,
        permission: "Active"
      })
      .then(function (response) {
        postHistory({
          date_recorded: new Date().getTime(),
          date_updated: new Date().getTime(),
          user_id: "amaiello",
          transaction_type: "share",
          object_type: "scorecard",
          description: `Role of all company members has been updated for ${scorecardData?.name} scorecard`,
          status: "New",
          object_id: scorecardData?.id,
          project_id: scorecardData?.id
        })
        setShareMess((prev) => ({ ...prev, active: true }));
        setFilterData([]);
        setShow(false);
        setRole((prev)=> ({...prev,bool:false}))
      })
      .catch(function (error) {
        console.log(error);
      });
  

}

  return (
    <Modal show={share} onHide={handleClose} size="md">
      <Modal.Header closeButton>
        <Modal.Title>Share</Modal.Title>
      </Modal.Header>
      {invite ? (
        <div className="share-scorecard-invite-by-em">
          <div className="invite-by-em-body">
            <div className="invite-body-frame">
              <div className="invite-users-text">Invite new users</div>
              <div className="inputs-frame">
                <input
                  className="custom-input"
                  placeholder="username@vncdesigner.com"
                />
                <div></div>
                <div className="access-option">
                  <DropdownButton
                    title="Viewer"
                    variant="secondary"
                    as={ButtonGroup}
                    key="secondary"
                    id="secondary"
                    className="custom-dropdown"
                  >
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div className="inputs-frame">
                <input className="custom-input" placeholder="email address" />
                <div></div>
                <div className="access-option">
                  <DropdownButton
                    title="Viewer"
                    variant="secondary"
                    as={ButtonGroup}
                    key="secondary"
                    id="secondary"
                    className="custom-dropdown"
                  >
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div className="add-email-address-main">
                <div>
                  <img
                    alt=""
                    src="/images/myscorecards/share-scorecard/empty-add.svg"
                  />
                </div>
                <div>Add email address</div>
              </div>
            </div>
          </div>
          <div className="invite-by-em-footer-main">
            <div onClick={() => setInvite(false)} style={{ cursor: "pointer" }}>
              <img
                alt=""
                src="/images/myscorecards/share-scorecard/backbutton.svg"
              />
            </div>
            <div>
              <img
                alt=""
                src="/images/myscorecards/share-scorecard/inviteandshare.svg"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="share-scorecard-main-empty">
          <div className="share-scorecard-main-body">
            <div className="input-container">
              <input type="text" id="myInput" style={{cursor:"pointer"}} onChange={filteredData} onFocus={() => { setShareMem(members); setFilterData(members); setShow(false); }} placeholder="Enter name or email" title="Type in a name" />
              {
                filterData?.length !== 0 && !show ? <IconButton sx={{ position: 'absolute', right: '33px', top: '39px' }} onClick={() => { setShow(true); setFilterData([]); }}>
                  <img src={"/images/myscorecards/members/Union.svg"} />
                </IconButton> : <></>
              }

            </div>
            {
              members.filter((mem) => scorecardData?.team?.filter((team) => team.permission !== "Revoked").some((share) => share.id === mem.id))?.length === 0 ?
                <></> :
                <>
                  {
                    show ? <div className="share-members">
                      <span className='members-heading'>Shared with {members.filter((mem) => scorecardData?.team?.filter((team) => team.permission !== "Revoked").some((share) => share.id === mem.id))?.length} members</span>
                      {members.filter((mem) => scorecardData?.team?.filter((team) => team.permission !== "Revoked").some((share) => share.id === mem.id)).map((data, index) => {
                        return (
                          <MemberList key={index} data={data} scorecardData={scorecardData} setShareMess={setShareMess} />
                        )
                      })}
                    </div> : <></>
                  }
                </>
            }
            {
              filterData?.length !== 0 ?
                <div className="share-members">
                  <span className='members-heading'>Members</span>
                  {filterData?.map((data, index) => {
                    return (
                      <MemberList key={index} data={data} scorecardData={scorecardData} setShareMess={setShareMess} />
                    )
                  })}
                </div> : <></>
            }
            <div className="table-rowmembers-parent">
              <div className="share-members-parent">
                <div className='left-part-style'>
                <div className="globe-svg">
                  <img
                    alt=""
                    src="/images/myscorecards/share-scorecard/globe.svg"
                  />
                </div>
                <div className="share-text">Share with all company members</div>
                </div>
                <div className='right-part-style'>
                <div>
                  <FormControl sx={{ width: 110 }} >
                    <InputLabel >Role</InputLabel>
                    <Select
                      label="Role"
                      autoWidth
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      defaultValue={"Read Only"}
                      onChange={(e)=> { handleRole(e); setRole((prev)=> ({...prev,role:e.target.value})); }}
                      disabled={!role.bool}
                    >
                      <MenuItem value={"Read Only"}>
                        Viewer
                      </MenuItem>
                      <MenuItem value={"Owner"}>Owner</MenuItem>
                      <MenuItem value={"Creator"}>Creator</MenuItem>
                      <MenuItem value={"Editor"}>Editor</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <Switch
                    onChange={(e) => handleShare(e)}
                    defaultChecked={members?.length <= scorecardData?.team?.filter((team) => team.permission !== "Revoked").length}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
                </div>
              </div>
              <div className="share-members-parent">
                <div
                  className="globe-svg"
                  onClick={() => setInvite(true)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    alt=""
                    src="/images/myscorecards/share-scorecard/add-icon.svg"
                  />
                </div>
                <div>Invite new users</div>
              </div>
            </div>


          </div>
        </div>
      )}
      <ToastContainer position="top-center">
        <Toast
          show={shareMess?.active}
          onClose={toggleShare}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Shared scorecard successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={shareMess?.revoke}
          onClose={toggleShare}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
            Removed Shared Member successfully!.
          </Toast.Body>
        </Toast>


      </ToastContainer>
    </Modal>
  );
};

export default MainEmpty;
