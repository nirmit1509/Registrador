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
                    <li className="add__property"> <AddIcon /> <a href="/upload">Upload</a> </li>
                    <li> <a href="/home">Home</a> </li>
                    <li> <a href="/my-properties">My Properties</a> </li>
                    <li> <a href="/pending-requests">Pending Requests</a> </li>
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