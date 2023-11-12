import React from 'react'
import './SignUp.css'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className='signup-parent'>
            <div className='signup-container'>
                <div className='signup-content'>
                    <div className='signup-header'>
                        <img alt="" src="/images/auth/vnc.svg" />
                        <b className='signup-text'>Let's get Started</b>
                    </div>
                    <Form className='signup-form'>
                        <div className='signup-input'>
                            <Form.Control type="email" className='signup-field' placeholder='Enter your email' />
                        </div>
                        <Button variant="contained" className='signup-button' style={{textTransform: "none"}} type="submit">SignUp</Button>
                    </Form>
                    <Divider className='divider' style={{ width: "100%" }}>OR</Divider>
                    <div className='signup-google' style={{ marginTop: "8px" }}>
                        <div><img alt="" src="/images/auth/google.svg" /></div>
                        <div>Sign up with Google</div>
                    </div>
                    <div className='signup-google'>
                        <div><img alt="" src="/images/auth/linkedin.svg" /></div>
                        <div>Sign up with Google</div>
                    </div>
                </div>
                <div className='free-trial-bottom'>
                    <div className='question'>Already have an account?</div>
                    <div className='question link-style'><Link>Log in</Link></div>
                </div>
            </div>

        </div>
    )
}

export default SignUp