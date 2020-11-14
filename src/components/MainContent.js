import React, { useState, useEffect } from 'react';
import '../css/MainContent.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandTransferContract from '../abis/LandTransfer.json';
import getWeb3 from '../getWeb3';
import Upload from './Upload';
import Home from './Home';
import MyProperties from './MyProperties';
import PendingRequests from './PendingRequests';
import RequestedByMe from './RequestedByMe';

function MainContent() {


    const [loading, setLoading] = useState(true);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [landTransferContract, setLandTransferContract] = useState(null);
    const [properties, setProperties] = useState([]);
    const [requests, setRequests] = useState([]);


    async function establishConnection() {
        // setLoading(true);
        const web = await getWeb3();
        setWeb3(web);
        const accounts = await web.eth.getAccounts();
        setAccount(accounts[0]);
        const nwId = await web.eth.net.getId();
        setNetworkId(nwId);
        const networkData = LandTransferContract.networks[nwId];

        // console.log(networkData.address)
        if(networkData) {
            const contract = new web.eth.Contract(LandTransferContract.abi, networkData.address)
            // const registrar = await contract.methods.registrar().call()
            // console.log(registrar)
            setLandTransferContract(contract)
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
        else {
            window.alert('Your Contracts not deployed to detected network.')
        }
    }

    useEffect(() => {
        establishConnection();
    }, [account]);
    
    // console.log(requests)

    return (
        !loading ?
        <div className="main__content">
            <Router>
                <Switch>
                    <Route exact path="/" >
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home">
                        <Home account={account} contract={landTransferContract} properties={properties} /> 
                    </Route>
                    <Route exact path="/upload">
                        <Upload account={account} contract={landTransferContract} />
                    </Route>
                    <Route exact path="/my-properties">
                        <MyProperties account={account} contract={landTransferContract} properties={properties} />
                    </Route>
                    <Route exact path="/pending-requests">
                        <PendingRequests account={account} contract={landTransferContract} requests={requests} />
                    </Route>
                    <Route exact path="/requested-by-me">
                        <RequestedByMe account={account} contract={landTransferContract} requests={requests} />
                    </Route>
                </Switch>
            </Router>    
        </div>
        :
        <div className="loading__gif">
            <img 
                src="https://i.gifer.com/KDVh.gif"     
            />
        </div>
    )
}

export default MainContent;
