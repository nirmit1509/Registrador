import React from 'react';
import './Left.css';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import logo from '../logo.png';

function Left() {
    return (
        <div className="left">
            <div className="left__top">
                <img 
                    src = {logo} 
                    alt = "Secure Share Logo"
                />
                <h2>Secure Share</h2>
            </div>
            <div className="left__middle">
                <ul id="items">
                    <li>Home</li>
                    <li>Shared</li>
                    <li>Send Request</li>
                    <li>Pending Requests</li>
                </ul>
            </div>
            <div className="left__bottom">
                <ul id="items">
                    <HelpOutlineIcon /><li>Find your public key</li>
                </ul>
            </div>
        </div>
    )
}

export default Left;