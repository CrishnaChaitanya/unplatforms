import React, { useState } from 'react';
import { useStyles } from './Style';
import {Button,CardActions,TextField} from "@material-ui/core";
import { addDoc } from 'firebase/firestore';
function AddComments({currUser, commentsCollectionRef}) {

    const classes = useStyles();
    const [text, setText] = useState('');

    const handleComment = async () => {
        let commentObject = {
           comment:text,
           currUser:currUser,
        }
        await addDoc(commentsCollectionRef, commentObject)
    }

    return (
        <CardActions className={classes.addComment}>
            <TextField
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && text !== '') {
                        e.preventDefault();
                        handleComment();
                    }
                }}
                value={text}
                label="Add a comment"
                style={{ width: "13.5rem" }}
                color="secondary"
                onChange={(e) => setText(e.target.value)}
            />
            <Button style={{ marginLeft: "10px" }} onClick={handleComment}>
                comment
            </Button>
        </CardActions>
    );
}

export default AddComments;
