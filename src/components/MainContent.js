import React, { useState, useEffect } from 'react';
import '../css/MainContent.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LandTransferContract from '../abis/LandTransfer.json';
import getWeb3 from '../getWeb3';
import Upload from './Upload';
import Home from './Home';
import MyProperties from './MyProperties';
import PendingRequests from './PendingRequests';

function MainContent() {


    const [loading, setLoading] = useState(true);
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [landTransferContract, setLandTransferContract] = useState(null);
    const [properties, setProperties] = useState([]);


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
            console.log(typeof(propCount))
            let temp = []
            for(let i=1; i<=propCount; i++) {
                const property = await contract.methods.properties(i).call()
                // console.log(property)
                temp.push(property)
            }
            setProperties(temp);
            setLoading(false);
        } 
        else {
            window.alert('Your Contracts not deployed to detected network.')
        }
    }

    useEffect(() => {
        establishConnection();
    }, []);
    
    console.log(properties)

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
                        <MyProperties />
                    </Route>
                    <Route exact path="/pending-requests">
                        <PendingRequests />
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
