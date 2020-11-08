import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';
import {headerCSS, cellCSS} from '../constants';


function PendingRequests({ account, contract, requests }) {

    const columns = [
        { title: "Request ID",        field: "requestId",  headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Property Owner",    field: "owner",      headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Request Initiator", field: "buyer",      headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Cost (in Eth)",     field: "cost",       headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Property Location", field: "location",   headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Contact Details",   field: "phone",      headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Status",            field: "status",     headerStyle: headerCSS,  cellStyle: cellCSS },
        // { title: "Property Details",  field: "ipfsHash",   headerStyle: headerCSS,  cellStyle: cellCSS },
        // { headerStyle: headerCSS,
        //   render: row => 
        //   <div> 
        //     { 
        //     (row.status==="1" || row.status==="2") 
        //     ? 
        //     <Button variant="outline-info">Request</Button> 
        //     :
        //     <Button variant="outline-secondary" disabled>Request</Button>
        //     }
        //   </div> 
        // },
    ]

    let data = []
    const fetchData = () => {
        requests.map((property, key) => {
                data.push(property)
        })
    }
    fetchData();

    return (
        <div className="pending__requests">
            <MaterialTable 
                    title="Pending Requests: "
                    data = {data}
                    columns = {columns}
                    options = {{
                        search: true,
                        sorting: true,
                        // selection: true,
                        // filtering: true,
                        paging: true,
                        pageSizeOptions: [5],
                        // exportButton: {pdf: false, csv: true},
                        // exportButton: true,
                        // exportAllData: true
                    }}
            />
        </div>
    )
}

export default PendingRequests;
