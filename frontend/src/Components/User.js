import React from 'react'
import { Link } from 'react-router-dom'
const User = ({
    userId,
    name,
    avatar
}) => {
    return (
        <Link to={`/user/${userId}`} style={{ textDecoration: "none", color: "black" }
        }>
            <div className="online-list">
                <div className="online">
                    <img src={avatar} alt="" />
                </div>
                <p>{name}</p>
            </div>
        </Link >
    )
}

export default User
