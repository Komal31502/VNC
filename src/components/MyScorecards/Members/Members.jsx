import React from "react"
import "./Members.css";
import { Avatar, Popover } from "@mui/material";



const Members = ({ recent, setRecent, action, id,scoreMem}) => {
    const handleClose = () => setRecent(false);
    return (
        <Popover
            id={id}
            open={action}
            anchorEl={recent}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            elevation={0}
        >
            <div className="members-wrapper">
                <div className="members-header">
                    <div className="header-title">
                        <div className="header-text">Members</div>
                    </div>
                </div>
                {scoreMem?.filter((score, i, arr) => arr.map((ele) => ele.id).indexOf(score.id) === i).map((item, index) => {
                    return (
                        <div className="members-container" key={index}>
                            <div className="container-menu-item">
                                <div className="menu-wrapper">
                                    <div className="menu-wrapper-content">
                                        <div>
                                            <Avatar>{item.username.charAt(0).toUpperCase() + "" + item.username.charAt(1).toUpperCase()}</Avatar>
                                        </div>
                                        <div className="member-titles">
                                            <div className="member-title-text">{item.username}</div>
                                        
                                            <div className="members-title-subtitle">
                                                <div >{item.role_name}</div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                )
                }
            </div>
        </Popover>
    )
}
export default Members;