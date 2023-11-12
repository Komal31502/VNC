import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import GroupAction from '../MyScorecards/GroupActions/GroupAction';

const Groups = ({ index, setActiveIndex, activeIndex, group }) => {
    const [grpaction, setGrpAction] = useState(null);
    const grp = Boolean(grpaction);
    const toggleClass = (index) => {
        if (localStorage.getItem("scorecard") !== null) {
            localStorage.removeItem("scorecard");
        }
        setActiveIndex((prev) => prev === index ? -1 : index);
    };
    return (
        <div className="scoregroup6">
            <div className="scorecontent9">
                <div className="scorefolder-icon11" onClick={() => toggleClass(index)}>
                    <img
                        className="scorefolder-icon12"
                        alt=""
                        src={
                            activeIndex === index
                                ? "/images/scoreFolderOpen.svg"
                                : "/images/Folder.svg"
                        }
                    />
                    {activeIndex !== index ?
                        <span className="folder-icon">
                            {group.scorecards.length}</span> :
                        <></>}

                </div>

                <div className="scoretext-and-supporting-text35" onClick={() => toggleClass(index)}>
                    <div className="scoretext116">{group.name}</div>
                </div>
                <div className="scoretabs1">
                    <div className="scoreavatar41" onClick={() => toggleClass(index)}>
                        <img
                            className="scoreavatar-placeholder-change-i35"
                            alt=""
                            src="/images/scoreAvatarGroup.svg"

                        />
                        <div className="scorebadge-anchor18" onClick={() => toggleClass(index)}>
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
                    <div className="scorebutton56 snowMan" key={index}>
                        <div className="scoreicon63">
                            <IconButton
                                className="scoreicon-wrapper-h65"
                                aria-controls={grp ? "basic-menu" : undefined}
                                aria-haspopup="true"
                                aria-expanded={grp ? "true" : undefined}
                                onClick={(e) => {
                                    setGrpAction(e.currentTarget);
                                }}
                            >
                                <img
                                    className="scoreicon-wrapper82"
                                    alt=""
                                    src="/images/scoreSnowman.svg"
                                />
                            </IconButton>
                            <GroupAction
                                grpaction={grpaction}
                                grp={grp}
                                setGrpAction={setGrpAction}
                                data={group}
                            />
                        </div>
                    </div>
                    <div
                        className="scorebutton58 snowMan"
                        onClick={() => toggleClass(index)}
                    >
                        <div className="scoreicon63">
                            {
                                group?.scorecards?.length === 0 ? null : (
                                    <div className="scoreicon-wrapper-h65">
                                        <img
                                            className="scoreicon-wrapper82 chevron"
                                            alt=""
                                            src={
                                                activeIndex === index
                                                    ? "/images/scoreChevronUp.svg"
                                                    : "/images/scoreChevronDown.svg"
                                            }
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups;