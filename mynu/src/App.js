import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.component";
import Logout_Navbar from "./components/Logout_Navbar.component";
import MenuList from "./components/MenuList.component";
import Profile from "./components/Profile.component";
<<<<<<< HEAD

=======
import Friends from "./components/Friends.component";
import CreateProfile from "./components/CreateProfile.component"
>>>>>>> 6f7ac26 (Add Logout functionality (primitive))
import Login from "./components/Login.component";



function App() {
  return (
    <Router>
      {/* <div>
      {
        sessionStorage.getItem("currentUID") ? (console.log("already logged in"),
          <Logout_Navbar />
        ) :  (<Navbar />)
      }
      </div> */}
      <Navbar />
      <br />
      <Routes>
        <Route path="/menu" exact element={ <MenuList/>} />
      </Routes>
      <Routes>
        <Route path="/profile" exact element={<Profile/>} />
      </Routes>
      <Routes>
        <Route path="/login" exact element={<Login/>} />
      </Routes>
    </Router>

  );
}


export default App;
