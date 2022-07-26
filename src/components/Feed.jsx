import React from "react";

import cardData from "../data/data";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@material-ui/core";
import "./FeedStyles.css"
import { useEffect,useState } from "react";
import { db } from "../firebase";
import {collection, getDocs, updateDoc, doc} from "@firebase/firestore"
import Comments from "./Comments"

const Userfeed = () => {

    const [like,setLike] = useState([])
    const [lock, setLock] = useState(false)
    const likesCollectionRef = collection(db, "likes")
    useEffect(()=>{

        const getLikes = async () => {
            const data = await getDocs(likesCollectionRef)
            setLike(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
     
        getLikes()
        
    },[like])

    // like button
    const likeButton =  () => {
        let Id;
        let currentLikes;
        like.map((like) => {
            Id = like.id;
            currentLikes = like.likeNumber;
          })
          updateLikes(Id, currentLikes)
    }

    const updateLikes = async (id,currLikes) => {
        const likesDoc = doc(db, "likes", id)
        const newFields = {likeNumber: lock?currLikes:currLikes+1}
        setLock(true)
        await updateDoc(likesDoc, newFields)
    }
  return (
    <Box sx={{ minWidth: "775px" }} className="feedBox">
      <Card variant="outlined" className="feedCard">
        <div className="hero">
            <img src="https://avatars.githubusercontent.com/u/54280958?v=4" alt="profile pic will be displayed here" />
            <div className="heroContent">
                <h6>{cardData.name}</h6>
                <h6>{cardData.position} </h6>
                <h6>{cardData.slogan}</h6>
            </div>
        </div>
        <CardContent>
          <Typography sx={{ fontSize: 6 }} color="text.secondary" gutterBottom>
            {cardData.study}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {cardData.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {likeButton()}}><b>Like</b> - {like.map((like) => {
            return(
               
                    <span>{like.likeNumber}</span>
                
            )
          })}</Button>
           <Button size="small"><Comments/></Button>
          <Button size="small">Share</Button>          
        </CardActions>
      </Card>
    </Box>
  );
};
export default Userfeed;
