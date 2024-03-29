import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {Button} from 'react-bootstrap';
import {headerCSS, cellCSS, landStatusString, SuccessAlert} from '../constants';

function Home({ web3, account, contract, properties, isRegistrar }) {

    const requestProp = (e, row) => {
        const price = web3.utils.toWei(row.cost.toString(), 'Ether')
        contract.methods.sendRequest(row.propertyId)
        .send({ from: account, value: price }, (error, transactionHash) => {
          if(transactionHash) {
            SuccessAlert("Request initiated..")
          }
          console.log("transaction hash is ",transactionHash);
        });
    }

    const columns = [
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Owner",             field: "seller",     headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => 
            <Tooltip title={row.seller} placement="bottom-end">
                <div>{`${row.seller.slice(0, -25)}....${row.seller.slice(37, 42)}`}</div>
            </Tooltip>, 
        },
        { title: "Property Details",  field: "ipfsHash",   headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => 
            <Tooltip title={row.ipfsHash} placement="bottom-end">
                <FileCopyIcon 
                    onClick={()=> window.open(`https://ipfs.io/ipfs/${row.ipfsHash}`, '_blank')} 
                />
            </Tooltip>, 
        },
        { title: "Cost (Eth)",        field: "cost",       headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Property Location", field: "location",   headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Contact Details",   field: "phone",      headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Status",            field: "status",     headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => <span>{landStatusString[row.status]}</span>
        },
        { headerStyle: headerCSS,     cellStyle: cellCSS,
          render: row => 
          <div> 
            { 
            (row.seller===account || row.status==="0" || row.status==="3" || isRegistrar)
            ? 
            <Button size="sm" variant="outline-secondary" disabled>Request</Button>
            :
            <Button size="sm" variant="outline-info" onClick={e=>requestProp(e, row)}>Request</Button> 
            }
          </div> 
        },
    ]

    return (
        <div className="home">
            <MaterialTable 
                    title="All Properties listed: "
                    data = {properties}
                    columns = {columns}
                    options = {{
                        search: true,
                        sorting: true,
                        paging: true,
                        pageSizeOptions: [5],
                    }}
            />
        </div>
    )
}

export default Home;
