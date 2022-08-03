import AuthProvider from "../components/authProvider";
import { useNavigate, navigate,useParams } from "react-router-dom";
import { logout } from "../firebase/firebase";
import { useEffect, useState} from 'react';





export default function SignOutView(){


  const navigate = useNavigate();

  async function handleUserLoggedIn(user){
  await logout();
  

}
  function handleUserNotLoggedIn(user){
    navigate('/');
    }
  function handleUserNotRegistered(user){
    navigate('/');
    }
 
    return (
    <AuthProvider
    onUserLoggedIn={handleUserLoggedIn}
    onUserNotLoggedIn={handleUserNotLoggedIn}
    onUserNotRegistered={handleUserNotRegistered}
    
    ></AuthProvider>
    );


}


