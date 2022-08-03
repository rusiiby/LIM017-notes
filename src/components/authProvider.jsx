 import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { useEffect, useState} from 'react';
import { auth, getUserInfo, registerNewUser, userExists} from "../firebase/firebase"
import{ useNavigate, Link  } from "react-router-dom";


export default function AuthProvider({ children,onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered }){
        const navigate = useNavigate();

        useEffect(() => {
         onAuthStateChanged(auth, async (user) => {
           if(user){
             const isRegistered = await userExists(user.uid);
             if(isRegistered){
               const userInfo = await getUserInfo(user.uid);
               if(userInfo.processCompleted){
              
                onUserLoggedIn(userInfo);

               }else{
                 onUserNotRegistered(userInfo);
               }
               //TODO: redirigir a dashboard
              //  navigate("/dashboard");
              //  setCurrentState(2);
              // onUserLoggedIn(user);
             }else{

              await registerNewUser({
                uid: user.uid,
                displayName: user.displayName,
                profilePicture: '',
                username : '',
                processCompleted: false,

              });
               onUserNotRegistered(user);
               //TODO: redirigir a username
              //  navigate("/choose-username");
              //  setCurrentState(3);
               console.log(user.displayName);
             }
           }else{
            //  setCurrentState(4);
            onUserNotLoggedIn();
             console.log('no hay nadie autenticado');
           }
         });
         },[navigate, onUserNotLoggedIn, onUserLoggedIn, onUserNotRegistered]);

    return <div>{ children }</div>;
 }