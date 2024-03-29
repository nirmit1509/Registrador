import React, { useState, useEffect } from 'react';
import '../css/MainContent.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Upload from './Upload';
import Home from './Home';
import MyProperties from './MyProperties';
import PendingRequests from './PendingRequests';
import RequestedByMe from './RequestedByMe';
import RegistrarRequests from './RegistrarRequests';

function MainContent( { web3, contract, account, isRegistrar } ) {


    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([]);
    const [requests, setRequests] = useState([]);


    async function fetchDetails() {
        setLoading(true);
            const propCount = await contract.methods.propertyCount().call();
            let temp = []
            for(let i=1; i<=propCount; i++) {
                const property = await contract.methods.properties(i).call()
                temp.push(property)
            }
            setProperties(temp);
            const requestCount = await contract.methods.requestCount().call();
            temp = []
            for(let i=1; i<=requestCount; i++) {
                const request = await contract.methods.requests(i).call()
                temp.push(request)
            }
            setRequests(temp);
        setLoading(false);
    }

    useEffect(() => {
        fetchDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    return (
        !loading ?
        <div className="main__content">
            {
                !isRegistrar
                ?
                <Router>
                <Switch>
                    <Route exact path="/home">
                        <Home 
                            web3 = {web3}
                            account={account} 
                            contract={contract} 
                            properties={properties} 
                            isRegistrar={isRegistrar} 
                            // contractAddress = {contractAddress}
                        /> 
                    </Route>
                    <Route exact path="/upload">
                        <Upload 
                            account={account} 
                            contract={contract} 
                        />
                    </Route>
                    <Route exact path="/my-properties">
                        <MyProperties 
                            account={account} 
                            contract={contract} 
                            properties={properties} 
                        />
                    </Route>
                    <Route exact path="/pending-requests">
                        <PendingRequests 
                            web3 = {web3}
                            account={account} 
                            contract={contract} 
                            requests={requests} 
                        />
                    </Route>
                    <Route exact path="/requested-by-me">
                        <RequestedByMe 
                            account={account} 
                            contract={contract} 
                            requests={requests} 
                        />
                    </Route>
                    <Route path="*" >
                        <Redirect to="/home" />
                    </Route>
                </Switch>
            </Router>
            :
            <Router>
                <Switch>
                    <Route exact path="/home">
                        <Home 
                            account={account} 
                            contract={contract} 
                            properties={properties} 
                            isRegistrar={isRegistrar} 
                        /> 
                    </Route>
                    <Route exact path="/registrar-pending-requests">
                        <RegistrarRequests 
                            web3 = {web3}
                            account={account} 
                            contract={contract} 
                            requests={requests} 
                            // contractAddress = {contractAddress}
                        />
                    </Route>
                    <Route path="*" >
                        <Redirect to="/home" />
                    </Route>
                </Switch>
            </Router>
            }
                
        </div>
        :
        <div className="loading__gif">
            <img 
                src="https://i.gifer.com/KDVh.gif"   
                alt="logo..."  
            />
        </div>
    )
}

export default MainContent;