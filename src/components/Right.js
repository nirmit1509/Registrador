import React from 'react';
import './Right.css';
import Navbar from './Navbar';
import MainContent from './MainContent';

function Right() {
    return (
        <div className="right">
            <div className="right__top">
                <Navbar />
            </div>
            <div className="right__body">
                <MainContent />
            </div>
        </div>
    )
}

export default Right;