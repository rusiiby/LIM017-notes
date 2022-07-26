// export default function SignOutView(){
//     return <div>signOutView</div>;
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

import { logout } from "../firebase/firebase";

export default function SignOutview() {
  useEffect(() => {}, []);
  const navigate = useNavigate();

  
}
