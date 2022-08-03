import AuthProvider from "../components/authProvider";
import{ useNavigate } from "react-router-dom";
import { useState} from 'react';
import DashboardWrapper from "../components/dashboardWrapper";
import { v4 as uuidv4}  from 'uuid';
import { insertNewLink, getLinks, updateNote, deleteNote, getProfilePhoto, setUserProfilePhoto } from '../firebase/firebase';
import Note from '../components/Note';
import { doc } from "firebase/firestore";

import style from './dashboardView.module.css';
import { setPersistence } from "firebase/auth";


export default function DashboardView(){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);
    const [title, setTitle] = useState(" ");
    const [description, setUrl] = useState(" ");
    const [links, setLinks] = useState([]);


    

     async function handleUserLoggedIn(user){
        // navigate('/dashboard');
        setCurrentUser(user);
        const url = await getProfilePhoto(user.profilePicture);
        setUserProfilePhoto(url);
      setState(2);
      const resLinks = await getLinks(user.uid);
      setLinks([...resLinks]);
      }
      function handleUserNotRegistered(user){
          navigate('/');
       // navigate('/choose-username');
    //    setCurrentUser(user);
    //    console.log("lol",user);
    //    setState(3);

      }
      function handleUserNotloggedIn(){
        // setCurrentState(4);
        navigate("/");
      }
      if(state === 0){
        return(
            <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotLoggedIn={handleUserNotloggedIn}
            onUserNotRegistered={handleUserNotRegistered}
            >loading</AuthProvider>
                );
      }

      function handleOnSubmit(e){
        e.preventDefault();
        addLink();
        e.target.reset();
      }
      function addLink(){
            if(title !== '' &&  description !== ''){
                const newLink = {
                    id: uuidv4(),
                    title: title,
                    description: description,
                    uid: currentUser.uid,
                };
                const res = insertNewLink(newLink);
                newLink.docId = res.id;
                setTitle('');
                setUrl('');
                setLinks([...links, newLink]);
            }
      }

       function handleOnChange(e){
           const value = e.target.value;
           if(e.target.name === 'title'){
            setTitle(value);
           }
           if(e.target.name === 'description'){
            setUrl(value);
           }  
       }
      async function handleDeleteLInk(docId){
        await deleteNote(docId);
        const tmp = links.filter(link => link.docId !== docId);
        setLinks([...tmp]);
      }

      async function handleUpdateLink(docId, title, description){
         const link = links.find(item => item.docId === docId);
    console.log('probando', link, docId, title, description);

         link.title = title;
         link.description = description;
         await updateNote(docId, link);
       }


      return (
    <DashboardWrapper>
        <div className="notes-container">
           <h1>Lab Note</h1>
           <div className="note-grid">
              <div className="note-content">
                <form className={style.entryContainer} action="" onSubmit={handleOnSubmit}>
                  <label htmlFor="title" hidden>Title</label>
                  <input className="input" type="text" placeholder="Título" name="title" onChange={handleOnChange}/>

                  <label htmlFor="text" hidden>Descripcion </label>
                  <textarea name="description" id="text" cols="30" placeholder="Escribe tu nota aquí ..."rows="10" onChange={handleOnChange}></textarea>

                  <input className="btn" type="submit" value="crear new note"/>
                </form>
              </div>
             {links.map((link) => (
               <Note 
               key={ link.docId } 
               docId={ link.docId }
               description={ link.description } 
               title={ link.title } 
               onDelete={handleDeleteLInk} 
               onUpdate={handleUpdateLink}
               />
               ))
             }
           </div>
        </div>
    </DashboardWrapper>
      );
}