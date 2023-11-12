import React from 'react'
import './ConfirmEmail.css'
import Button from '@mui/material/Button';

const ConfirmEmail = () => {
    return (
        <div className='confirm-container'>
            <div className='confirm-content'>
                <div className='confirm-header'>
                    <img alt="" src="/images/auth/vnc.svg" />
                    <b className='confirm-text'>Confirm Your Email</b>
                    <div className='instruction' >
                        <span>Please go to your email address </span>
                        <span className="nameemailcom">name@email.com  to verify your account</span>
                    </div>
                </div>
                <Button variant="contained" className='confirm-button' style={{textTransform: "none"}}>Resend Email</Button>
            </div>

        </div>
    )
}

export default ConfirmEmail