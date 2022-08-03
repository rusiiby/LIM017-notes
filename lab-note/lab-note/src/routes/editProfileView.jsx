// import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import DashboardWrapper from "../components/dashboardWrapper";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from 'react';
import { setUserProfilePhoto, getUserProfile, getProfilePhoto, updateUser} from "../firebase/firebase";



export default function EditProfileView(){

const navigate = useNavigate();
const [currentUser, setCurrentUser] = useState({});
const [state, setState] = useState(0);
const [profileUrl, setProfileUrl] = useState(null);
const fileRef = useRef(null);





 async function handleUserLoggedIn(user){
     setCurrentUser(user);
     setState(2);

 }
 function handleUserNotLoggedIn(user){
   navigate('/');
 }
 function handleUserNotRegistered(user){
   navigate('./');
 }
function handleOpenFilePicker(){
  if(fileRef.current){
    fileRef.current.click();
  }
}
function handleChangeFile (e){
  const files = e.target.files;
   const fileReader = new FileReader();

   if(fileReader && files && files.length > 0){

     fileReader.readAsArrayBuffer(files[0]);
      fileReader.onload = async function(){
        const imageData = fileReader.result;

        const res = await setUserProfilePhoto(currentUser.uid, imageData);
        console.log(res); 
        if(res){
          const tmpUser= {...currentUser};
          tmpUser.profilePicture = res.metadata.fullPath;
          await updateUser(updateUser);
          setCurrentUser({...tmpUser});
          const url = await  getProfilePhoto(currentUser.profilePicture);
          setProfileUrl(url);
        }
      };
   }
}
 if(state !== 2){
  return <AuthProvider 
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn} 
        onUserNotRegistered={handleUserNotRegistered}
        ></AuthProvider>
 }
    return (
            <DashboardWrapper>
              <div>
                <h2>Edit profile Info</h2>
                <div>
                  <div>
                    <img src={profileUrl} alt="" width={100}/>
                  </div>
                  <div>
                    <button onClick={handleOpenFilePicker} >choose new profile picture</button>
                    <input ref={fileRef} type="file" style ={{ display:"none"}} onChange={ handleChangeFile }/>
                  </div>
                </div>
              </div>
            </DashboardWrapper>
    );
}