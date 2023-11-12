import React, { useState } from "react"
import "./TopGroupActions.css"
import { Modal } from 'react-bootstrap';


const TopGroupAction = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const Items = [
        {
            icon: '/images/myscorecards/group-actions/settings.svg',
            text: "Settings"
        },
        {
            icon: '/images/myscorecards/group-actions/share.svg',
            text: "Share"
        },
        {
            icon: '/images/myscorecards/group-actions/details.svg',
            text: "Details"
        },
        {
            icon: '/images/myscorecards/group-actions/delete.svg',
            text: "Delete Group"
        }

    ]

    return (
        <Modal show={show} onHide={handleClose} size="sm" dialogClassName="container-size" >
          <div className="parent-padding">
          {Items.map((item, index) => {
                return (
                    <div className="top-group-actions">
                        <div className="top-group-items">
                            <div className="top-group-wrapper">
                                <div className="top-group-content">
                                    <div className="top-group-icon-wrapper">
                                        <img className="top-group-wrapper-icon" alt="" src={item.icon} />
                                    </div>
                                    <div className="top-group-text">
                                        <div className="top-group-text1">{item.text}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
          </div>
      
        </Modal>
    )
}

export default TopGroupAction;