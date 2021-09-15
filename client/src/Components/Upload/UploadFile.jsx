import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {IconButton, Paper, Button, List ,ListItem, ListItemAvatar, Avatar,ListItemText,ListItemSecondaryAction } from '@material-ui/core';
import {Delete as DeleteIcon, Folder as FolderIcon } from '@material-ui/icons';
import { uploadConection } from '../../Functions/api/upload';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: theme.spacing(2),
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        minWidth: "100%",
        maxWidth: "100%",
    },
    paper: {
   
      minWidth: "100%",
      maxWidth: "100%",
    },
    list: {
      minWidth: "100%",
      maxWidth: "100%",
    },
    button:{
        width:"100%"
    }
}));

export default function UploadFile({files, setFiles}) {
    const [myWidget, setmyWidget] = useState({})
    const classes = useStyles();

    let fileArr = files || []
    
    useEffect(() => {
      var myWidgetConect = window.cloudinary.createUploadWidget({
        cloudName: 'makelaar',
        uploadPreset: 'amojar0m'
      }, (error, result) => {
        if (!error && result && result.event === "success") {
          fileArr.push({name: result.info.original_filename, url:result.info.url})
          setFiles([...fileArr])
        }
      }
      )
      myWidgetConect.open();
      myWidgetConect.close();
      setmyWidget(myWidgetConect)
    }, [])
    



    async function uploadImage() {
        await myWidget.open()
    }

    function deleteFile(pos){
        let fileDel=[...files]
        fileDel.splice(pos,1)
        setFiles(fileDel)
    }

    return (
        <div className={classes.root}>
            <Paper lassName={classes.paper}>
            <Button className={classes.button} variant="contained" color="primary" onClick={() => uploadImage()}>Subir documento</Button>
            <div className={classes.demo}>
            <List className={classes.list}>
              {files.map((e,pos)=>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={e.name}
                    />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>deleteFile(pos)} >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
          </div>
            </Paper>
        </div>
    )
}