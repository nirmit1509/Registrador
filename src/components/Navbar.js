import React from 'react';
import '../css/Navbar.css';
import { Avatar } from "@material-ui/core";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

function Navbar() {
    return (
        <div className="navbar">
            {/* <p>0x3E2c9d2FcA20639dF76de6dc3f986BfDAfC546df</p> */}
            <Avatar src={`https://avatars.dicebear.com/api/avataaars/hii.svg`} />
        </div>
    )
}

export default Navbar;
