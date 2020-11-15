import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {headerCSS, cellCSS, SuccessAlert, FailureAlert} from '../constants';


function RegistrarRequests({ account, contract, requests }) {

    const approveByRegistrar = (e, reqId) => {
        console.log(reqId);
        contract.methods.registrarApproval(reqId)
        .send({ from: account }, (error, transactionHash) => {
          if(transactionHash) {
            SuccessAlert("You approved this request..")
          }
          console.log("transaction hash is ",transactionHash);
        });
    }

    const rejectByRegistrar = (e, reqId) => {
        console.log(reqId);
        contract.methods.registrarRejection(reqId)
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
            row.registrarApproved && !row.registrarRejected
            ?
            <div>{`Approved by you.`}</div>
            :
            !row.registrarApproved && row.registrarRejected
            ?
            <div>{`Rejected by you.`}</div>
            :
            <div>{`Please respond to this request.`}</div>
        },
        { headerStyle: headerCSS,     cellStyle: cellCSS,
            render: row => 
            <div> 
              { 
              (!(row.registrarRejected || row.registrarApproved))
              ? 
               <Button size="sm" variant="outline-success" onClick={e=>approveByRegistrar(e, row.requestId)}>Approve</Button>
              :
               <Button size="sm" variant="outline-secondary" disabled>Approve</Button>
              }
            </div> 
        },
        { headerStyle: headerCSS,     cellStyle: cellCSS,
            render: row => 
            <div> 
              { 
              (!(row.registrarRejected || row.registrarApproved))
              ? 
              <Button size="sm" variant="outline-danger" onClick={e=>rejectByRegistrar(e, row.propertyId)}>Reject</Button> 
              :
              <Button size="sm" variant="outline-secondary" disabled>Reject</Button> 
              }
            </div> 
        },
    ]

    let data = []
    const fetchData = () => {
        requests.map((req, key) => {
            if(req.ownerApproved)
                data.push(req)
        })
    }
    fetchData();

    return (
        <div className="pending__requests">
            <MaterialTable 
                    title="Pending Requests for you to confirm: "
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

export default RegistrarRequests;