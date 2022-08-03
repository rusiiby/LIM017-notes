import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { existUsername, getProfilePhoto, getUserPublicProfileInfo, setUserProfilePhoto } from "../firebase/firebase";
import PublicLink from "../components/publicLink";
import DashboardWrapper from "../components/dashboardWrapper";
import style from "./publicProfileView.module.css";
import styleLink from "../components/publickLink.module.css";


export default function PublicProfileView(){
    const params = useParams();
    const [profile, setProfile] = useState(null);
    const [url, setUrl] = useState("");
    const [state, setState] = useState(0);


    useEffect(() => {
        getProfile();
        async function getProfile(){
            const username = params.username;
        try {
            const userUid = await existUsername(username);

            if(userUid){
                const userInfo = await getUserPublicProfileInfo(userUid);
                setProfile(userInfo);

                const url = await getProfilePhoto(userInfo.profileInfo.profilePicture);
                setUrl(url);
            }else{
                setState(7);
            }
        } catch (error) {
            
        }

        }
        
        
    }, [params]);

    if(state === 7){
        return <div>
                <h1> Username no existe</h1>
            </div>
    }

    return (
        <DashboardWrapper>

        <div className={style.profileContainer}>
            <div className={style.profilePicture}>
                <img src={url} alt="" width="100" />
            </div>
            <h2>{profile?.profileInfo.username}</h2>
            <h3>{profile?.profileInfo.displayName}</h3>
            <div className={styleLink.publicLinkContainer}>
                {profile?.linksInfo.map((link) => (
                    <PublicLink key={link.uid} url={link.url} title={link.title}/>
                    // <a href={link.url}>{link.title}</a>
                ))}
            </div>
         </div>
        </DashboardWrapper>

   
    );   
}