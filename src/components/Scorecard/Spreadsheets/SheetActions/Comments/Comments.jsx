import React, { useContext, useEffect, useState } from 'react'
import "./Comments.css"
import Form from 'react-bootstrap/Form';
import { SpreadsheetContext } from '../../../../../context/SpreadsheetContext';
import dayjs from 'dayjs';
import axios from 'axios';
import { rootUrl } from '../../../../../Constants';
import { Button } from '@mui/material';


const Comments = ({ isTextBox }) => {
    const { goalComments, kpiComments, actionComments, type } = useContext(SpreadsheetContext);
    console.log("comment", type)
    const [isInputFocused, setInputFocused] = useState(false);
    const handleInputFocus = () => {
        setInputFocused(true);
    };
    const handleInputBlur = () => {
        setInputFocused(false);
    };
    const [commentText, setCommentText] = useState({
        note_text: ""
    })
    const handlePostComments = async (event) => {
        event.preventDefault();
        await axios.post(`${rootUrl}/ObjectiveServlet?action=create_comment`, {
            item_id: type?.id,
            item_type: type?.name === "goal" ? "objective" : type?.name === "kpi" ? "kpi": type?.name === "action" ? "action": "",
            created_by: "amaiello",
            note_text: commentText.note_text
        })
            .then((res) => {
                setCommentText((prev) => ({ ...prev, note_text: "" }))
                
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='comment-section'>
            <div className='comments-text'>Comments</div>
            {isTextBox && (
                <div className='leave-comment-parent'>
                    <div className='comment-avatar'>
                        <img alt="" src="/images/myscorecards/members/avatar1.svg" />
                    </div>
                    <div className='comment-text-box'>
                        <Form.Control
                            type="text"
                            placeholder="Leave a comment"
                            onChange={(event) => {
                                setCommentText((prev) => ({ ...prev, note_text: event.target.value }))
                            }}
                            onFocus={handleInputFocus}
                            value={commentText?.note_text}
                        />
                        {isInputFocused && (
                            <Button variant="contained" onClick={handlePostComments} style={{ textTransform: "none", borderRadius: "10px" }}>
                                Add Comment
                            </Button>
                        )}
                    </div>
                </div>
            )}
            <div />
            <div className='comments-body'>
                <>
                    {
                        goalComments?.map((goal, index) => {
                            return (
                                <div className='comment-div-parent' key={index}>
                                    <div className='comment-avatar'>
                                        <img alt="" src="/images/myscorecards/members/avatar3.svg" />
                                    </div>
                                    <div className='comment-details'>
                                        <div className='comment-info-header'>
                                            <div className='info-left'>
                                                <div>{goal.created_by}</div>

                                            </div>
                                            <div className='info-right'>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-actions/share.svg" />
                                            </div>
                                        </div>
                                        <div>{goal.note_text}</div>
                                    </div>

                                </div>
                            );
                        })}
                </>
                <>
                    {
                        kpiComments?.map((goal, index) => {
                            return (
                                <div className='comment-div-parent' key={index}>
                                    <div className='comment-avatar'>
                                        <img alt="" src="/images/myscorecards/members/avatar3.svg" />
                                    </div>
                                    <div className='comment-details'>
                                        <div className='comment-info-header'>
                                            <div className='info-left'>
                                                <div>{goal.created_by}</div>

                                            </div>
                                            <div className='info-right'>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-actions/share.svg" />
                                            </div>
                                        </div>
                                        <div>{goal.note_text}</div>
                                    </div>

                                </div>
                            );
                        })}
                </>
                <>
                    {
                        actionComments?.map((goal, index) => {
                            return (
                                <div className='comment-div-parent' key={index}>
                                    <div className='comment-avatar'>
                                        <img alt="" src="/images/myscorecards/members/avatar3.svg" />
                                    </div>
                                    <div className='comment-details'>
                                        <div className='comment-info-header'>
                                            <div className='info-left'>
                                                <div>{goal.created_by}</div>

                                            </div>
                                            <div className='info-right'>
                                                <img alt="" src="/images/scorecard/spreadsheets/table-actions/share.svg" />
                                            </div>
                                        </div>
                                        <div>{goal.note_text}</div>
                                    </div>

                                </div>
                            );
                        })
                    }
                </>
            </div>
        </div>
    )
}

export default Comments;