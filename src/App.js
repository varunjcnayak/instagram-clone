//import logo from './logo.svg';
import './App.css';
import pic from './download.jpg'
import Post from './Post';
import React, { useEffect, useState } from 'react';
import { Input } from '@mui/material';
import { auth, db } from './firebase';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {  createTheme, makeStyles } from '@material-ui/core/styles';
import ImageUpload from './ImageUpload';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
//import InstagramEmbed from 'react-instagram-embed';
const theme = createTheme();
function getModalStyle() {
  const top =50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles =  makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border:'2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2,4,3),
  },
}));
function App() {
  //const classes =useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [openSignIn, setOpenSignIn]  = useState(false);
  const [open, setOpen] = useState(false);
  //const handleOpen = () => setOpen(true);
 // const handleClose = () => setOpen(false);
  const [username, setUsername]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
   const [user, setUser] =useState('varun');
  //front-end listener
   useEffect(() =>{
    //keeps u logged in when refreshed
   const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser)
      { console.log(authUser);
        setUser(authUser);
       } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  },[user, username]);

useEffect(()=> {
// where the code runs 
db.collection('posts').onSnapshot(snapshot => {
  setPosts(snapshot.docs.map(doc => ({
    id: doc.id,
    post: doc.data()
  })));
})
}, []);
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const signUp = (event) =>{
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)   
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error)=> alert(error.message));
  setOpen(false);
  }

  const signIn =(event) =>{
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=> alert(error.message))
  setOpenSignIn(false);
  }
  return (
    <div className="App">
         
      
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form className="app__signup">
        <Box sx={style}>
          <center>
        <img 
        className="app__headerImage"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVQT2XVhbPyqQiLptpdrRPyujH6TZMMxX3_9LH3jZtmRDG4m7AsjbYaPVbbeoUHgzg9Y&usqp=CAU"
        alt="ok"
        width="50" height="60"/>
        </center>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign Up 
          </Typography>
          <Input 
          placeholder="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)} 
          />
          <Input 
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          />
          
          <Button type="submit" onClick={signUp} >Sign Up</Button>
        </Box>
        </form>
      </Modal>
      <div className="app__header">
        <img 
        className="app__headerImage"
        src={pic}
        alt="ok"
        width="50" height="60"/>
        {user ? (
        <Button onClick={() => auth.signOut()} >Log Out</Button>
      
      ):
      (
        <div className="app__loginContainer">
        <Button onClick={signIn} >Sign In</Button>
        <Button onClick={() => setOpenSignIn(true)} >Sign Up</Button>
        </div>
      )}

      </div>
    {/* sign out if user not  active  */}
      

  <div className="app__posts">  
    <div className="app__postsLeft">
    {
      posts.map( ({id, post} )=> (
        <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
    }
    </div>
    {/* <InstagramEmbed
      url='https://www.instagram.com/p/CfMAAncrLGC/'
      clientAccessToken='123|456'
      maxWidth={320}
      hideCaption={false}
      containerTagName='div'
      protocol=''
      injectScript
      onLoading={() => {}}
      onSuccess={() => {}}
      onAfterRender={() => {}}
      onFailure={() => {}}
    /> */}
    <div className="app__postsRight">
     <TwitterTimelineEmbed
  sourceType="profile"
  screenName="jcnykvrn"
  options={{height: 4400}
  }
     />
     </div>
</div>
    {user?.displayName ? (
          <ImageUpload username={user.displayName}/>
      
      ):
      (
        <h3>Sorry Login to upload</h3>
      )}
    </div>
  );
}

export default App;
