import React from 'react';
import '../css/Home.css';
import MaterialTable from 'material-table';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import {Button} from 'react-bootstrap';
import {headerCSS, cellCSS} from '../constants';


function MyProperties({ account, contract, properties }) {

    const columns = [
        { title: "Prop ID",           field: "propertyId", headerStyle: headerCSS,  cellStyle: cellCSS },
        { title: "Owner",             field: "seller",     headerStyle: headerCSS,  cellStyle: cellCSS,
          render: row => 
            <Tooltip title={row.seller} placement="bottom-end">
                <div>{`${row.seller.slice(0, -20)}...`}</div>
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
        { title: "Status",            field: "status",     headerStyle: headerCSS,  cellStyle: cellCSS },
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
                    title="My Properties: "
                    data = {data}
                    columns = {columns}
                    options = {{
                        cellStyle: {
                            fontSize: 5,
                        },
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