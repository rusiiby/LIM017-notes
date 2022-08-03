import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';

import { useEffect, useState} from 'react';
import { auth, userExists, handleUserStateChanged} from "../firebase/firebase"
import{ useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

import style from "./login.module.css";

export default function LoginView(){
  const navigate = useNavigate();
  //const [currentUser, setCurrentUser] = useState(null);
  const [state, setCurrentState] = useState(0);


async function handleOnClick(){
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);

    async function signInWithGoogle(GoogleProvider){
      try {
          const res = await signInWithPopup(auth, GoogleProvider);
          console.log(res);
      } catch (error){
          console.error(error);
  
      }
    }
 }


function handleUserLoggedIn(user){
  navigate('/dashboard');
}
function handleUserNotRegistered(user){
  navigate('/choose-username');
}
function handleUserNotloggedIn(){
  setCurrentState(4);
}

  if(state === 4){
    return (
      <div className ={style.LoginView}>
        <div className="loginLeft">
        </div>
        <div className="loginRigth">
          
          <div>
            <h1> Lab Note</h1>
          </div>
            <button className={style.provider} onClick={handleOnClick}>Login with google</button>
            {/* <button className={style.provider}>Register</button> */}
        
        </div>
      </div>
    );
  }

  if(state === 5){
    return (
      <div>
          
      </div>
    );
  }

  return (

    <AuthProvider onUserLoggedIn={handleUserLoggedIn} onUserNotRegistered={handleUserNotRegistered} onUserNotLoggedIn={handleUserNotloggedIn}
    >
    <div className='spinner-loading'>
       <div className="text">
        <div class="lds-heart">
          <div></div>
        </div>
        <div>Loading ...</div>
       </div>
    </div>

    </AuthProvider>
    );
}


// state
// 0: Inicializado
// 1: loading...
// 2: login completo
// 3: login pero sin registro
// 4: No hay nadie logueado
// 5: Ya existe el username
// 6: Nuevo username click para continuar
// 7: username no existe
