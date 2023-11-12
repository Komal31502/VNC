import React from 'react'
import './FreeTrail.css'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from '@mui/material';
import Form from 'react-bootstrap/Form';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const FreeTrial = () => {
    return (
        <div className='free-trial-parent'>
            <div className='free-trial-container'>
                <div className='free-trial-content'>
                    <div className='free-trial-header'>
                        <img alt="" src="/images/auth/vnc.svg" />
                        <b className='free-trial-text'>Start your Free Trial</b>
                    </div>
                    <div className='free-trial-inst'>This is your chance to turn your strategy into reality!</div>
                    <Form className='trial-form' style={{ width: "100%" }}>
                        <div className='free-trial-input'>
                            <Form.Control type="email" className='free-trial-email' placeholder='Enter your email' style={{ width: "100%" }} />
                            <div className='edit-container' >
                                <span className='edit-text'>Edit</span>
                            </div>
                        </div>
                        <div className='free-trial-input'>
                            <Form.Control type="email" className='free-trial-email' placeholder='Password' style={{ width: "100%" }} />
                            <div className='edit-container' >
                                <RemoveRedEyeOutlinedIcon />
                            </div>
                        </div>
                        <Button variant="contained" className='free-trial-button' type="submit" style={{textTransform: "none"}}>Continue</Button>
                    </Form>
                   
                    <Divider className='divider' style={{ width: "100%" }}>OR</Divider>
                    <div className='free-trial-google' style={{ marginTop: "8px" }}>
                        <div><img alt="" src="/images/auth/google.svg" /></div>
                        <div>Sign up with Google</div>
                    </div>
                    <div className='free-trial-google'>
                        <div><img alt="" src="/images/auth/linkedin.svg" /></div>
                        <div>Sign up with Google</div>
                    </div>
                </div>
                <div className='free-trial-bottom'>
                    <div className='question'>Already have an account?</div>
                    <div className='question'><Link>Log in</Link></div>
                </div>

            </div>

        </div>
    )
}

export default FreeTrial