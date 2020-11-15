import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {headerCSS, cellCSS, SuccessAlert, FailureAlert} from '../constants';


function RequestedByMe({ account, contract, requests }) {

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
            <div style={{color: 'green'}}>{`Owner Approved your request.`}</div>
            :
            !row.ownerApproved && row.ownerRejected
            ?
            <div style={{color: 'red'}}>{`Owner Declined your request.`}</div>
            :
            <div>{`Your Request is under evaluation.`}</div>
        }
    ]

    let data = []
    const fetchData = () => {
        requests.map((req, key) => {
            if(req.buyer===account)
                data.push(req)
        })
    }
    fetchData();

    return (
        <div className="pending__requests">
            <MaterialTable 
                    title="Your Requests Status: "
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

export default RequestedByMe;
