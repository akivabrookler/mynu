import React, {Component, useState} from "react"
import TextField from "../../node_modules/@mui/material/TextField"
import { getMenuBySearch } from "../utils/searching.js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const [search,setSearch] = useState('')
const dispatch = useDispatch()
const navig = useNavigate()
    
const searchMenu = () => {
    if(search.trim()){
      dispatch(getMenuBySearch(search));
      //send site to the search term
      navig(`/menu_items/search?searchVal=${search || 'none'}`);
    }
    else{
      navig('/');
    }
  };


export default class searchBar extends Component{
render(){
  return(
    <div>
      <TextField 
        onKeyDown = {key => {
          if(key.key == 'Enter'){
          searchMenu();}
        }}
        variant="outlined" 
        label="Search Menu" 
        fullWidth 
        value={search} 
        onChange={e => setSearch(e.target.value)}
        />
    </div>
  )
}
}
