import React from 'react';
import "./BadResponse.css";

const BadResponse = () => {
    return (
        <div className='badContainer'>
            <img className="logo-icon2" alt="" src="/images/logo.svg" />
            <div>
                502
            </div>
            <div>
                Bad Gateway
            </div>
            <p>The server encountered an error and could not complete your request.</p>
        </div>
    )
}

export default BadResponse;