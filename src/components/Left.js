import React from 'react';
import '../css/Left.css';
import AddIcon from '@material-ui/icons/Add';
import logo from '../assets/logo.jpg';

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
                    <li className="add__property">
                        <AddIcon /> 
                        Upload
                    </li>
                    <li>Home</li>
                    <li>My Properties</li>
                    <li>Pending Requests</li>
                </ul>
            </div>
            <div className="left__bottom">
                <ul id="items">
                    {/* <HelpOutlineIcon /><li>Find your public key</li> */}
                </ul>
            </div>
        </div>
    )
}

export default Left;