import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {headerCSS, cellCSS, SuccessAlert, FailureAlert} from '../constants';


function PendingRequests({ account, contract, requests }) {

    const approveByOwner = (e, reqId) => {
        console.log(reqId);
        contract.methods.ownerApproval(reqId)
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash) {
            SuccessAlert("You approved this request..")
          }
          console.log("transaction hash is ",transactionHash);
        });
    }

    const rejectByOwner = (e, reqId) => {
        console.log(reqId);
        contract.methods.ownerRejection(reqId)
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash) {
            FailureAlert("You rejected this request initiated..")
          }
          console.log("transaction hash is ",transactionHash);
        });
    }

    const columns = [
        { title: "Request ID",        field: "requestId",  headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Request Initiator", field: "buyer",      headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => 
            <Tooltip title={row.buyer} placement="bottom-end">
                <div>{`${row.buyer.slice(0, -25)}....${row.buyer.slice(37, 42)}`}</div>
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
        { title: "Status",            headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => 
            row.ownerApproved && !row.ownerRejected
            ?
            <div>{`Approved by you.`}</div>
            :
            !row.ownerApproved && row.ownerRejected
            ?
            <div>{`Rejected by you.`}</div>
            :
            <div>{`Please respond to this request.`}</div>
        },
        { headerStyle: headerCSS,     cellStyle: cellCSS,
            render: row => 
            <div> 
              { 
              (row.owner===account && !(row.ownerRejected || row.ownerApproved))
              ? 
               <Button size="sm" variant="outline-success" onClick={e=>approveByOwner(e, row.requestId)}>Approve</Button>
              :
               <Button size="sm" variant="outline-secondary" disabled>Approve</Button>
              }
            </div> 
        },
        { headerStyle: headerCSS,     cellStyle: cellCSS,
            render: row => 
            <div> 
              { 
              (row.owner===account && !(row.ownerRejected || row.ownerApproved))
              ? 
              <Button size="sm" variant="outline-danger" onClick={e=>rejectByOwner(e, row.propertyId)}>Reject</Button> 
              :
              <Button size="sm" variant="outline-secondary" disabled>Reject</Button> 
              }
            </div> 
        },
    ]

    let data = []
    const fetchData = () => {
        requests.map((req, key) => {
            if(req.owner===account)
                data.push(req)
        })
    }
    fetchData();

    return (
        <div className="pending__requests">
            <small>{account}</small>
            <MaterialTable 
                    title="Pending Requests for your Property: "
                    data = {data}
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

export default PendingRequests;