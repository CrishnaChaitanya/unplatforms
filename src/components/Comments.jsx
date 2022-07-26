import React, { useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import AddComments from "./AddComment"
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from 'react';
import { db } from "../firebase";
import {collection, getDocs} from "@firebase/firestore"


export default function Comments() {
    const [comments,setComments] = useState(["loading"])
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth()
  const commentsCollectionRef = collection(db, "comments")
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getComments = async () =>{
        const data = await getDocs(commentsCollectionRef)
        setComments(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }
    getComments()
  },[comments])

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Comment {comments.length}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
            {
                comments.map((item) => {
                    return(
                        <div>
                            <p>{item.currUser} <i>says...</i></p>
                            <h6><i>{item.comment}</i></h6>
                            <hr/>
                        </div>
                    )
                  })}
        </DialogContent>
        <DialogActions>
         <AddComments currUser={currentUser.email} commentsCollectionRef={commentsCollectionRef}/>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}