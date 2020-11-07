import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';

const headerCSS = {
    backgroundColor: 'rgb(220, 222, 224)',
    fontWeight: 'bold',
    fontSize: '15px',
}


function PendingRequests({ account, contract, requests }) {

    const columns = [
        { title: "Request ID",        field: "requestId",  headerStyle: headerCSS },
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS },
        { title: "Property Owner",    field: "owner",      headerStyle: headerCSS },
        // { title: "Cost (in Eth)",     field: "cost",       headerStyle: headerCSS },
        // { title: "Property Location", field: "location",   headerStyle: headerCSS },
        // { title: "Contact Details",   field: "phone",      headerStyle: headerCSS },
        // { title: "Status",            field: "status",     headerStyle: headerCSS },
        // { title: "Property Details",  field: "ipfsHash",   headerStyle: headerCSS },
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

    return (
        <div className="pending__requests">
            <MaterialTable 
                    title="All Properties listed: "
                    data = {requests}
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
