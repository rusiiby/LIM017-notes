import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import{ BrowserRouter, Routes, Route } from "react-router-dom";

import LoginView from './routes/loginView';
import ChooseUsernameView from './routes/chooseUsernameView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/singOutView';
import DashboardView from './routes/dashboardView';
import PublicProfileView from './routes/publicProfileView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<App />
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
