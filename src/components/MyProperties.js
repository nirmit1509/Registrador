import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import {Button} from 'react-bootstrap';

const headerCSS = {
    backgroundColor: 'rgb(220, 222, 224)',
    fontWeight: 'bold',
    fontSize: '15px',
}


function MyProperties({ account, contract, properties }) {

    const columns = [
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS },
        { title: "Owner",             field: "seller",     headerStyle: headerCSS },
        { title: "Cost (in Eth)",     field: "cost",       headerStyle: headerCSS },
        { title: "Property Location", field: "location",   headerStyle: headerCSS },
        { title: "Contact Details",   field: "phone",      headerStyle: headerCSS },
        { title: "Status",            field: "status",     headerStyle: headerCSS },
        { title: "Property Details",  field: "ipfsHash",   headerStyle: headerCSS },
        // { headerStyle: headerCSS,
        //   render: row => 
        //   <div> 
        //     { 
        //     (row.status==="1" || row.status==="2") 
        //     ? 
        //     <Button variant="outline-info" onClick={e=>requestProp(e, row.propertyId)}>Request</Button> 
        //     :
        //     <Button variant="outline-secondary" disabled>Request</Button>
        //     }
        //   </div> 
        // },
    ]

    let data = []
    const fetchData = () => {
        properties.map((property, key) => {
            if(property.seller === account) {
                data.push(property)
            }
        })
    }
    fetchData();

    return (
        <div className="my__properties">
            <small>{account}</small>
            <MaterialTable 
                    title="My Properties List: "
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

export default MyProperties;