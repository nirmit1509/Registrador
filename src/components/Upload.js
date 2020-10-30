import React, { useState } from 'react';
import '../css/Upload.css';
import ipfs from '../ipfs';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '35ch',
      },
    },
    dropzone: {
        '& > *': {
            width: '65ch'
        },
    },
}));

function Upload() {

    const classes = useStyles();

    const [hash, setHash] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [cost, setCost] = useState('');

    const uploadDetails = (e) => {
        e.preventDefault();
        console.log('Submitted');
        console.log(phone);
        console.log(location);
        console.log(cost);
        console.log(hash);
    }

    const captureFile = (e) => {
        const file = e.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
        // console.log(Buffer(reader.result))
        ipfs.add(Buffer(reader.result), (err, ipfsHash) => {
            setHash(ipfsHash[0].hash)
        })
        // console.log(hash);
    }}

    return (
        <div className="upload">
            <br />
            <form className="upload__form"  onSubmit={(e) => uploadDetails(e)}>
                <TextField 
                    className={classes.root}
                    id="phone" 
                    label="Phone Number" 
                    inputProps={{ pattern: "[0-9]*", maxLength: '10' }}
                    maxLength='10'
                    onChange={e=> {setPhone(e.target.value)}} 
                    required
                />
                <TextField 
                    className={classes.root}
                    id="cost" 
                    label="Estimated Cost (in Eth)" 
                    inputProps={{ pattern: "[0-9]*", maxLength: '4' }}
                    onChange={e=> {setCost(e.target.value)}} 
                    required
                />
                <TextField 
                    id="location" 
                    label="Property Location" 
                    style={{width:'70ch', margin:'8px'}}
                    onChange={e=> {setLocation(e.target.value)}} 
                    required
                />
                <DropzoneArea 
                    className={classes.dropzone}
                    type='file'
                    onSave = {(e) => captureFile(e) }
                />
                {/* <input 
                    type='file' 
                    onChange={(event) => {
                        captureFile(event)
                    }}
                /> */}
                <Button
                    variant="contained"
                    type="submit"
                    color="default"
                    className="upload_btn"
                    style={{width:'35ch'}}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
            </form>
        </div>
    )
}

export default Upload;
