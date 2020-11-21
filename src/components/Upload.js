import React, { useState, useCallback, useMemo } from 'react';
import {useDropzone} from 'react-dropzone';
import '../css/Upload.css';
import ipfs from '../ipfs';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { SuccessAlert } from '../constants';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
        margin: theme.spacing(1),
        width: '25vw',
      },
    },
    dropzone: {
        '& > *': {
            width: '65vw'
        },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
}));

function Upload( { account, contract }) {

    const classes = useStyles();

    const [hash, setHash] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    const [cost, setCost] = useState('');
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setLoading(true)
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.readAsArrayBuffer(file)
            reader.onloadend = async() => {
                await ipfs.add(Buffer(reader.result), (err, ipfsHash) => {
                    setHash(ipfsHash[0].hash)
                    setLoading(false)
                    setFile(file)
                    SuccessAlert('File Uploaded Successfully...')
                })
        }})
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    // const {ref, ...rootProps} = getRootProps()

    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        paddingTop: '6%',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'rgb(224 223 164)',
        borderStyle: 'dashed',
        backgroundColor: 'rgb(239 245 203)',
        color: '#bdbdbd',
        outline: 'none',
        width: '50vw',
        height: '25vh',
        marginTop: '2%',
        marginLeft: '5%',
        transition: 'border .24s ease-in-out'
      };
    const activeStyle = {
        borderColor: '#2196f3'
    };

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [
        isDragActive,
      ]   
    );

    const uploadDetails = (e) => {
        e.preventDefault();
        contract.methods.registerLand(hash, location, cost, phone)
        .send({ from: account }, (error, transactionHash) => {
              console.log("transaction hash is ",transactionHash);
              SuccessAlert("Upload Successful...")
            })
        e.target.reset();
    }

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
                    style={{width:'55vw', margin:'8px'}}
                    onChange={e=> {setLocation(e.target.value)}} 
                    required
                />
                {
                    loading
                    ?
                    <div className="loading__gif">
                        <img 
                            src="https://i.gifer.com/KDVh.gif"     
                            height='150vh'
                            alt="logo..." 
                        />
                    </div>
                    :
                    <div {...getRootProps({style})}>
                        <input {...getInputProps()} />
                        {
                            isDragActive ?
                            <p>Drop the files here ...</p> :
                            <div style={{display:'flex', flexDirection:'column', placeItems:'center'}}>
                                <p>{`Drag & drop file here, or click`}</p>
                                <CloudUploadIcon />
                            </div>
                            
                        }
                    </div>
                }

                {
                    file
                    ?
                    <TextField 
                        className={classes.root}
                        id="file" 
                        label="File Uploaded" 
                        value={file.name}
                        style={{width:'55vw', margin:'8px'}}
                    />
                    :
                    null
                }
                               
                <Button
                    variant="contained"
                    type="submit"
                    color="default"
                    className="upload_btn"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
            </form>
        </div>
    )
}

export default Upload;