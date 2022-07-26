import React from "react";


import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import "./FeedStyles.css"
import { useEffect,useState } from "react";
import { db } from "../firebase";
import {collection, getDocs, updateDoc, doc} from "@firebase/firestore"
  
const Userfeed = () => {

    const [like,setLike] = useState([69])
    const likesCollectionRef = collection(db, "likes")
    useEffect(()=>{

        const getLikes = async () => {
            const data = await getDocs(likesCollectionRef)
            setLike(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getLikes()
    },[])

    // like button
    const likeButton =  () => {
        let Id;
        let currentLikes;
        console.log("like logic will be written here ");
        like.map((like) => {
            Id = like.id;
            currentLikes = like.likeNumber;
          })
          updateLikes(Id, currentLikes)

    }

    const updateLikes = async (id,currLikes) => {
        const likesDoc = doc(db, "likes", id)
        const newFields = {likeNumber: currLikes+1}
        await updateDoc(likesDoc, newFields)
    }
  return (
    <Box sx={{ minWidth: 475 }} className="feedBox">
      <Card variant="outlined" className="feedCard">
        <div className="hero">
            <img src="https://avatars.githubusercontent.com/u/54280958?v=4" alt="profile pic will be displayed here" />
            <div className="heroContent">
                <p>Krishna Chaitanya</p>
                <p>Alum | Finance, MBA | 2016 | Business Manager</p>
                <p>1d | San Fransisco</p>
            </div>
        </div>
        <CardContent>
          <Typography sx={{ fontSize: 6 }} color="text.secondary" gutterBottom>
            The concept of Research : A cross-cultural study
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {likeButton()}}>Like {like.map((like) => {
            return(
                <div>
                    <h1>{like.likeNumber}</h1>
                </div>
            )
          })}</Button>
          <Button size="small">Comment</Button>
          <Button size="small">Share</Button>          
        </CardActions>
      </Card>
    </Box>
  );
};
export default Userfeed;
