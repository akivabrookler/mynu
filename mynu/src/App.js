import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.component";
import MenuList from "./components/MenuList.component";
import Profile from "./components/Profile.component";

import Login from "./components/Login.component";



function App() {
  return (
    <Router>
      <Navbar/>
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
