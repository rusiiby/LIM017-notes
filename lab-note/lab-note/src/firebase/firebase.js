import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {
     getStorage, 
     ref, 
     uploadBytes, 
     getBytes, 
     getDownloadURL 
} from 'firebase/storage';
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDoc, 
    doc, 
    query, 
    where, 
    setDoc, 
    deleteDoc, 
    getDocs,
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAXDp_xoLigugikJv7D2dGt0LqlU0sLmPI",
  authDomain: "lab-notes-f823c.firebaseapp.com",
  projectId: "lab-notes-f823c",
  storageBucket: "lab-notes-f823c.appspot.com",
  messagingSenderId: "406199156404",
  appId: "1:406199156404:web:390723f88de5f752da61e1",
  measurementId: "G-MSS0T5S6RK"
};


// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY ,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROYECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId:process.env.REACT_APP_MESSAGINGSENDERID,
//   appId:process.env.REACT_APP_APPID,
//   // measurementId:process.env.REACT_APP_MESSUREMENTID
// };

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export async function userExists(uid){
   const docRef = doc(db, "users", uid);
    const res = await getDoc(docRef);
    console.log(res);
    return res.exists();
}
 export async function existUsername(username){
   const users = [];
   const docsRef = collection(db, 'users');
   const q = query(docsRef, where('username', '==', username));

   const querySnapshot = await getDocs(q);

   querySnapshot.forEach( doc => {
     users.push(doc.data());
   });
    return users.length > 0 ? users[0].uid : null;
 }

  export async function registerNewUser(user){
    try{
      const collectionRef = collection(db,'users');
      const docRef = doc(collectionRef, user.uid);
      await setDoc(docRef,user);
      // const docRef = doc(db, 'user', user.uid);
    }catch (error){}
  }

   export async function updateUser(user){
     
     try {
       const collectionRef = collection(db, 'users');
       const docRef = doc(collectionRef, user.uid);
       await setDoc(docRef, user);
     } catch (error) {}
   }

export async function getUserInfo(uid){
  try {
    const docRef = doc(db, 'users', uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (error) {}
}

export  async function insertNewLink(link){
  try {
    const docRef = collection(db, 'content');
    const res = await addDoc(docRef, link);
    return res;
  } catch (error) {
    console.error("error de documento", error);
  }
}

export async function getLinks(uid){
  const content = []; 

  try {
    const collectionRef = collection(db, 'content');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

  querySnapshot.forEach(doc => {
    const link = {...doc.data()};
    link.docId = doc.id;
    content.push(link);
  });
  return content;

  } catch (error) {
    console.error("error de documento", error);

  }
}
 export async function updateNote(docId,link){
   try {
     const docRef = doc(db, 'content', docId);
     const res = await setDoc(docRef, link);

     return res;
   } catch (error) {
    console.error("error de documento", error);
   }
 }
 export async function deleteNote(docId){
  try {
    const docRef = doc(db, 'content', docId);
    const res = await deleteDoc(docRef);

    return res;
  } catch (error) {
    console.error("error de documento", error);
  }
}
 export async function setUserProfilePhoto(uid, file){
   try {
    const imageRef = ref(storage, `images/${uid}`);
    const resUpload = await uploadBytes(imageRef, file);
    return resUpload;
   } catch (error) {
    console.error("error de documento", error);

   }
   
 }
 export async function getProfilePhoto(profilePicture){
   try {
     const imageRef = ref(storage, profilePicture);

     const description = await getDownloadURL(imageRef);
     return description;
   } catch (error) {
    console.error("error de documento", error);

   }

 }