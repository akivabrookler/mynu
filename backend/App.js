//import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar.component";
import MenuList from "./components/MenuList.component";
import Profile from "./components/Profile.component";
import Friends from "./components/Friends.component";
import searchBar from "../mynu/src/components/searchBar.js"




function App() {
  return (
    <Router>
      <Navbar/>
      <br />
      <Routes>
        <Route path="/" exact component={searchBar}/>
      </Routes>
      <Routes>
        <Route path="/menu" exact element={ <MenuList/>} />
      </Routes>
      <Routes>
        <Route path="/profile" exact element={<Profile/>} />
      </Routes>
      <Routes>
        <Route path="/friends" exact element={<Friends/>} />
      </Routes>
    </Router>

  );
}

/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
<p>Hello</p>
    </div>
  );
}
<br />
      <Route path="/" exact component={MenuList} />
      <Route path="/add" exact component={AddMenuItem} /> 
      */

export default App;
