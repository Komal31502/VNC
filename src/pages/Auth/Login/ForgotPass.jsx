import React from 'react'
import './ForgotPass.css'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import Form from 'react-bootstrap/Form';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const ForgotPass = () => {
    return (
        <div className='forgot-pass-parent'>
            <div className='forgot-pass-container'>
                <div className='forgot-pass-content'>
                    <div className='forgot-pass-header'>
                        <img alt="" src="/images/auth/vnc.svg" />
                        <b className='forgot-pass-text'>Login into VNCDesigner</b>
                    </div>
                    <Form className='trial-form' style={{ width: "100%" }}>
                        <div className='forgot-pass-input'>
                            <Form.Control type="email" className='forgot-pass-email' placeholder='name@email.com' style={{ width: "100%" }} />
                            <div className='edit-container' >
                                <span className='edit-text'>Edit</span>
                            </div>
                        </div>
                        <div className='forgot-pass-input'>
                            <Form.Control type="email" className='forgot-pass-email' placeholder='Password' style={{ width: "100%" }} />
                            <div className='edit-container' >
                                <RemoveRedEyeOutlinedIcon />
                            </div>
                        </div>
                        <div className='forgot-link' ><Link>Forgot Password</Link></div>
                    <Button variant="contained" style={{textTransform: "none"}} className='forgot-pass-button'>Continue</Button>
                    </Form>                 
                </div>
                <div className='forgot-pass-bottom'>
                    <div className='question'>Don't have an account?</div>
                    <div className='question'><Link>Create Account</Link></div>
                </div>

            </div>

        </div>
    )
}

export default ForgotPass