import{Link} from "react-router-dom";
import style from './dashboardWrapper.module.css';
// import logo from './assets/img/logo.png';
import images from '../assets/images';
import React from 'react';


export default function DashboardWrapper({children}){
    return (
    <div className="dashboard-content">
        <div className="header-dashboard">
            <nav className={style.nav}>
            <div >
             <img className="logo" src={images.img1} alt=""/>
        </div>
                <div className="menu">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/dashboard/profile">Profile</Link>
                    <Link to="/signout">Signout</Link>  
                    <Link to="/u/username">Public profile</Link>
                </div>        
            </nav>
        </div>
        <div className="main-containe" > 
            {children}
        </div>
    </div>
    );
    

}