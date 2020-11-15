import React, { useState, useEffect } from 'react';
import '../css/App.css';
import LandTransferContract from '../abis/LandTransfer.json';
import getWeb3 from '../getWeb3';
import ReactNotifications from 'react-notifications-component';
import Left from './Left';
import Right from './Right';

function App() {

    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [networkId, setNetworkId] = useState('');
    const [landTransferContract, setLandTransferContract] = useState(null);
    const [isRegistrar, setIsRegistrar] = useState(false);
    
    async function establishConnection() {
      const web = await getWeb3();
      setWeb3(web);
      const accounts = await web.eth.getAccounts();
      setAccount(accounts[0]);
      const nwId = await web.eth.net.getId();
      setNetworkId(nwId);
      const networkData = LandTransferContract.networks[nwId];

      if(networkData) {
          const contract = new web.eth.Contract(LandTransferContract.abi, networkData.address)
          const registrar = await contract.methods.registrar().call()
          if(registrar===accounts[0]) {
            setIsRegistrar(true);
          }
          setLandTransferContract(contract);
      } 
      else {
          window.alert('Your Contracts not deployed to detected network.')
      }
  }

  useEffect(() => {
      establishConnection();
  }, []);  

  return (
    landTransferContract
    ?
    <div className="app">
      <div className="app__body">
        <ReactNotifications />
        <Left 
            web3 = {web3}
            account = {account}
            networkId = {networkId}
            contract = {landTransferContract}
            isRegistrar = {isRegistrar}
        />
        <Right 
            web3 = {web3}
            account = {account}
            networkId = {networkId}
            contract = {landTransferContract}
            isRegistrar = {isRegistrar}
        /> 
      </div>
    </div>
    :
    <div className="app__loading__gif">
        <img 
          src="https://i.gifer.com/KDVh.gif"     
        />
    </div>
  );
}

export default App;