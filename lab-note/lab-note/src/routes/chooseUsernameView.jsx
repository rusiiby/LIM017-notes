import AuthProvider from "../components/authProvider";
import{ useNavigate,Link } from "react-router-dom";
import{ useState } from "react"; 
import { existUsername, updateUser } from "../firebase/firebase";
import style from './chooseUsername.module.css'



export default function ChooseUsernameView(){
    const navigate = useNavigate();
    const [state, setState] = useState(0);
    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState(" ");




    function handleUserLoggedIn(user){
        navigate('/dashboard');
      }
      function handleUserNotRegistered(user){
       // navigate('/choose-username');
       setCurrentUser(user);
       setState(3);
      }
      function handleUserNotloggedIn(){
        // setCurrentState(4);
        navigate("/");
      }
      function handleInputUsername(e){
        setUsername(e.target.value);
      }
     async function handleContinue(){
        if(username !== ''){
            const exists = await existUsername(username);
            if(exists){
                setState(5);
            }else{
                const tmp = {...currentUser };
                tmp.username = username;
                tmp.processCompleted = true; 
                await updateUser(tmp);
                setState(6);

            }
        }
      }

      if(state === 3 || state === 5){
          return (
            <div className={style.containerChoos}>
              <div className={style.chooseUsernameContainer}>
                <h1>Biembenido  {currentUser.displayName}</h1>
                <p>Para terminar el proceso elige un apodo</p>
                {state === 5?<p>El nombre de usuario ya existe, escoge otro</p> : " "}
                <div>
                    <input className="input"  type="text" onChange={handleInputUsername}/>
                </div>
                <div>
                    <button className="btn" onClick={handleContinue} >Continue</button>
                </div>
              </div>
            </div>
         
      );
    }
      if(state === 6){
        return(
         <div className={style.chooseUsernameContainer}>
            <h1> felicidades ya puedes ir al dashbord a crear las notas </h1>
            <Link to ="/dashboard">continuar</Link>
        </div>
        );
      }

    return( <AuthProvider 
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotRegistered={handleUserNotRegistered} 
        onUserNotLoggedIn={handleUserNotloggedIn}
    ></AuthProvider>
    )
}