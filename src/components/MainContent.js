import React from 'react';
import '../css/MainContent.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Upload from './Upload';
import Home from './Home';
import MyProperties from './MyProperties';
import PendingRequests from './PendingRequests';

function MainContent() {
    return (
        <div className="main__content">
            <Router>
                <Switch>
                    <Route exact path="/" >
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home">
                        <Home /> 
                    </Route>
                    <Route exact path="/upload">
                        <Upload />
                    </Route>
                    <Route exact path="/my-properties">
                        <MyProperties />
                    </Route>
                    <Route exact path="/pending-requests">
                        <PendingRequests />
                    </Route>
                </Switch>
            </Router>    
        </div>
    )
}

export default MainContent;
