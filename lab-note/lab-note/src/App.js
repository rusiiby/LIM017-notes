// import logo from './logo.svg';
// import './App.css';
import{ BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from './routes/loginView';
import ChooseUsernameView from './routes/chooseUsernameView';
import EditProfileView from './routes/editProfileView';
import SignOutView from './routes/singOutView';
import DashboardView from './routes/dashboardView';
import PublicProfileView from './routes/publicProfileView';

function App() {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element ={< LoginView />} />
      <Route path="dashboard" element ={< DashboardView />} />
      <Route path="dashboard/profile" element ={< EditProfileView />} />
      <Route path="signout" element ={< SignOutView />} />
      <Route path="u/:username" element ={< PublicProfileView />} />
      <Route path="choose-username" element ={< ChooseUsernameView />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
