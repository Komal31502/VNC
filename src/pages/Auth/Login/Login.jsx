import React, { useContext, useState } from 'react'
import './Login.css'
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Form from 'react-bootstrap/Form';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Toast, ToastContainer } from "react-bootstrap";

const LoginPage = () => {
    const navigate = useNavigate();
    const user = {
        email: "amaiello@acme.net",
        password: "1234"
    }
    const [login, setLogin] = useState({
        success:false,
        error:false
    });
    const { userDetails, setUserDetails } = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userDetails.email && !userDetails.password) {
            setLogin((prev)=>({...prev,error:true}))
        }
        else {
            if (userDetails?.email?.toLowerCase() === user.email && userDetails?.password === user.password) {
                setLogin((prev)=>({...prev,success:true}))
                sessionStorage.setItem("vncuser", JSON.stringify(userDetails));
                navigate("/home");
            } else {
                setLogin((prev)=>({...prev,error:true}))
            }
        }
    }
    const toggleShow = () => setShow({
        success:false,
        error:false
    });
    return (
        <>
        <div className='login-parent'>
            <div className='login-container'>
                <div className='login-content'>
                    <div className='login-header'>
                        <img alt="" src="/images/auth/vnc.svg" />
                        <b className='login-text'>Log into VNCDesigner</b>
                    </div>
                    <Form className='form' onSubmit={handleSubmit}>
                        <div>
                            <Form.Control type="email" required className='login-field' placeholder='Enter your email' onChange={(e) =>
                                setUserDetails((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            />
                        </div>
                        <div style={{ position: "relative" }}>
                            <Form.Control type={show ? "text" : "password"} required className='login-field' placeholder="Password" 
                            onChange={(e) =>
                                setUserDetails((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                            />
                            <IconButton sx={{ position: 'absolute', right: '5px', top: '4px' }} onClick={() => setShow(!show)}>
                                {
                                    show ?
                                        <VisibilityIcon /> :
                                        <VisibilityOffIcon />
                                }
                            </IconButton>
                        </div>

                        <Button variant="contained" className='login-button' style={{ textTransform: "none" }} type="submit">Login into VNCDesigner</Button>
                    </Form>
                    <Divider className='divider' style={{ width: "100%" }}>OR</Divider>
                    <div className='login-google'>
                        <div><img alt="" src="/images/auth/google.svg" /></div>
                        <div>Sign up with Google</div>
                    </div>
                    <div className='login-google'>
                        <div><img alt="" src="/images/auth/linkedin.svg" /></div>
                        <div>Sign up with Linkedin</div>
                    </div>
                    <div className='free-trial-bottom'>
                        <div className='question'>Don't have an account?</div>
                        <Link sx={{ textDecoration: "none", fontSize: "14px", fontWeight: "400" }}>Create Account</Link>
                    </div>
                </div>
            </div>
            <div className='side-container'>
                <div className='title'>
                    You're About to Enter Strategy Paradise.
                </div>
                <div className="subtitle">
                    Join the Program and Discover a new path to strategy execution success
                </div>
                <div className="stars">
                    <img className="star-icon" alt="" src="/images/auth/Star.svg" />
                    <img className="star-icon" alt="" src="/images/auth/Star.svg" />
                    <img className="star-icon" alt="" src="/images/auth/Star.svg" />
                    <img className="star-icon" alt="" src="/images/auth/Star.svg" />
                    <img className="star-icon" alt="" src="/images/auth/Star.svg" />
                    <b className="rating">
                        4.9/5
                    </b>

                </div>

                <img src="/images/auth/person.svg" className='person' />




            </div>
        </div>
        <ToastContainer position="top-center">
        <Toast
          show={login.success}
          onClose={toggleShow}
          autohide={true}
          delay={3000}
          bg={"success"}
        >
          <Toast.Body className="success-text">
           Login successfully!.
          </Toast.Body>
        </Toast>
        <Toast
          show={login.error}
          onClose={toggleShow}
          autohide={true}
          delay={3000}
          bg={"danger"}
        >
          <Toast.Body className="success-text">
           Invalid Credentials.
          </Toast.Body>
        </Toast>
      </ToastContainer>
      </>
    )
}

export default LoginPage