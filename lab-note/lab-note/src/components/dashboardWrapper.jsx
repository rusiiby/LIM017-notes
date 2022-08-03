import{Link} from "react-router-dom";

export default function DashboardWrapper({children}){
    return (
    <div className="dashboard-content">
        <div className="header-dashboard">
            <nav>
                <div className="logo">Logotipo</div>
                <div className="menu">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/dashboard/profile">Profile</Link>
                    <Link to="/singnout">Signout</Link>  
                </div>        
            </nav>
        </div>
        <div> 
            {children}
        </div>
    </div>
    );
}