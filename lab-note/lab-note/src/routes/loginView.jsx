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


// useEffect(() => {
//    setCurrentState(1);
//   onAuthStateChanged(auth, async (user) => {
//     if(user){
//       const isRegistered = await userExists(user.uid);
//       if(isRegistered){
//         //TODO: redirigir a dashboard
//         navigate("/dashboard");
//         setCurrentState(2);
//       }else{
//         //TODO: redirigir a username
//         navigate("/choose-username");
//         setCurrentState(3);
//         console.log(user.displayName);
//       }
//     }else{
//       setCurrentState(4);
//       console.log('no hay nadie autenticado');
//     }
//   });
//   },[navigate]);



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
//  function handleUserLoggedIn(user){
//    navigate('/dashboard')
//  }
//  function handleUserNotLoggedIn(user){
//    navigate('/choose-username')
//  }
//  function handleUserNotRegistered(user){
//    setCurrentState(4);
//  }

function handleUserLoggedIn(user){
  navigate('/dashboard');
}
function handleUserNotRegistered(user){
  navigate('/choose-username');
}
function handleUserNotloggedIn(){
  setCurrentState(4);
}


  // if(state === 2){
  //   return <div>Estas autenticado y registrado</div>
  // }
  // if(state === 3){
  //   return <div>Estas autenticado pero no registrado</div>
  // }
  if(state === 4){
    return (
      <div className ={style.LoginView}>
        <div className="loginLeft">
        </div>
        <div className="loginRigth">
          <div>
            <h1> Lab Note</h1>
          </div>
            <button className={style.provider} onClick={handleOnClick}><img className="googleIcon" src=  " https://cdn-icons-png.flaticon.com/512/281/281764.png?w=740F"></img>Login with google</button>
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
     <div>loading ...</div>

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
