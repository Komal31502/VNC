import React from 'react'
import './Reset.css'
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';

const Reset = () => {
  return (
    <div className='reset-container'>
      <div className='reset-content'>
        <div className='reset-header'>
          <img alt="" src="/images/auth/vnc.svg" />
          <b className='reset-text'>Reset Password</b>
          <div className='instruction' >Enter the email associated your account and we’ll send an email with instructions to reset your password</div>
        </div>
        <div className='reset-input'>
          <Form style={{ width: "100%" }}>
            <Form.Control type="email" className='reset-field' placeholder='name@gmail.com' style={{ marginBottom: "16px" }} />
            <Button variant="contained" className='reset-button' style={{textTransform: "none"}} type="submit">Reset Password</Button>
          </Form>
        </div>

      </div>

    </div>
  )
}

export default Reset