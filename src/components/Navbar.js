import React from 'react';
import './Navbar.css';
import { Avatar } from "@material-ui/core";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function Navbar() {
    return (
        <div className="navbar">
            <h1>Navbar</h1>
            <NotificationsNoneIcon />
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/hii.svg`} />
        </div>
    )
}

export default Navbar
