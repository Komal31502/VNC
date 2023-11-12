import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className='badContainer'>
            <img className="logo-icon2" alt="" src="/images/logo.svg" />
            <div>
                404
            </div>
            <div>
                Page Not Found
            </div>
            <p>The page you requesting is not found.</p>
            <Link to="/home">
                Back to home
            </Link>
        </div>
    )
}

export default PageNotFound