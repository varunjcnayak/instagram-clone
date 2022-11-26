import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import { storage, db } from "./firebase";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';
function ImageUpload({username}) {
    const [image, setImage]  = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');
   
    const handleChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        //puttinng the image and name into firedb
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      
      uploadTask.on(
          "state_changed",
          (snapshot) => {
              //progress function -------.....---
              const progress = Math.round(
                  (snapshot.bytesTransferred/snapshot.totalBytes)*100
              );
              setProgress(progress);
          },
          (error) => {
              //error func 
              console.log(error);
              alert(error.message);
          },
          () =>  {
                //main logic 
                //go grab the url of uploaded image
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then( url => {
                    //post image in DB
                    //timestamp usefil for sorting the new posts to top
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: username
                    });
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                });
          }
      );


    };
  
    return (
    <div className="imageupload">
        <progress value={progress} className="imgaa" max="100"/>
       <input type="text" placeholder="Enter a Caption.." onChange={event => setCaption(event.target.value)} value={caption}/>
       <input type="file" onChange={handleChange} />
       <Button onClick={handleUpload}>
           Upload
       </Button>
    </div>
  )
}

export default ImageUpload