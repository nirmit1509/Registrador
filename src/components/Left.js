import React from 'react';
import '../css/Left.css';
import AddIcon from '@material-ui/icons/Add';
import logo from '../assets/logo.jpg';

function Left( { web3, contract, networkId, account, isRegistrar } ) {

    return (
        isRegistrar
        ?
        <div className="left">
            <div className="left__top">
                <img 
                    src = {logo} 
                    alt = "Secure Share Logo"
                />
                <h2>Registrador</h2>
            </div>
            <div className="left__middle">
                <ul id="items">
                    <li id="registrar">Registrar</li>
                    <li> <a href="/home">Home</a> </li>
                    <li> <a href="/registrar-pending-requests">Requests to Approve</a> </li>
                </ul>
            </div>
            <div className="left__bottom">
                <ul id="items">
                    {/* <HelpOutlineIcon /><li>Find your public key</li> */}
                </ul>
            </div>
        </div>

        :

        <div className="left">
            <div className="left__top">
                <img 
                    src = {logo} 
                    alt = "Secure Share Logo"
                />
                <h2>Registrador</h2>
            </div>
            <div className="left__middle">
                <ul id="items">            
                    <li className="add__property"> <AddIcon /> <a href="/upload">Upload</a> </li>
                    <li> <a href="/home">Home</a> </li>
                    <li> <a href="/my-properties">My Properties</a> </li>
                    <li> <a href="/pending-requests">Pending Requests</a> </li>
                    <li> <a href="/requested-by-me">Requested By Me</a> </li>
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