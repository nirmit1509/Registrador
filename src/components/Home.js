import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';

const headerCSS = {
    backgroundColor: 'rgb(220, 222, 224)',
    fontWeight: 'bold',
    fontSize: '15px',
}


function Home({ account, contract, properties }) {

    const columns = [
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS },
        { title: "Owner",             field: "seller",     headerStyle: headerCSS },
        { title: "Cost (in Eth)",     field: "cost",       headerStyle: headerCSS },
        { title: "Property Location", field: "location",   headerStyle: headerCSS },
        { title: "Contact Details",   field: "phone",      headerStyle: headerCSS },
        { title: "Status",            field: "status",     headerStyle: headerCSS },
        { title: "Property Details",  field: "ipfsHash",   headerStyle: headerCSS },
        // { headerStyle: headerCSS,     export: false,
        //   render: row => 
        //   <div> 
        //     { 
        //     row.is_blocked==='No' 
        //     ? 
        //     <Button variant="outline-danger" onClick={e=>block(e, row)}>Block</Button> 
        //     :
        //     <Button variant="outline-success" onClick={e=>unblock(e, row)}>Unblock</Button>
        //     }
        //   </div> 
        // },
    ]

    return (
        <div className="home">
            <small>{account}</small>
            <MaterialTable 
                    title="All Properties listed: "
                    data = {properties}
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

export default Home;
