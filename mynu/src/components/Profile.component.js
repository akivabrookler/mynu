import React, { Component } from 'react';
import axios from 'axios';
import { allergens } from '../utils/allergens';
import {FormControlLabel, Checkbox, Button, ListItem, List} from '@mui/material';
import { Link } from "react-router-dom";



const config = require('../config.json')

export default class Profile extends Component {
    constructor(props){
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePreference = this.onChangePreference.bind(this);

        this.state = {
          username: '',
          email: '',
          preferences: [],
          checkboxes: Array(allergens.length)
      }
    }

    componentDidMount() {
      console.log('entered componentDidMount');
      let uid = sessionStorage.getItem('currentUID');

      if (uid === null) {
        console.log('Not logged in. Goto Login');
        window.location = '/login';
      }

      axios.get( config.api_url +'profiles/' + uid)
        .then(response => {
          console.log('cUID email: ' + response.data.email);
          console.log('cUID username: ' + response.data.username);
          console.log('cUID preferences: ' + response.data.preferences);

          this.setState({
            username: response.data.username,
            email: response.data.email,
            preferences: response.data.preferences
          })
        })
      console.log(this.state);
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePreference = (state, preference) => {
      let resultArray = []
      if(state)
      {
          resultArray = this.state.preferences.filter(CheckedId=>
            CheckedId !== preference
          )
          resultArray.push(preference)
      }
      else
      {
          resultArray = this.state.preferences.filter(CheckedId=>
            CheckedId !== preference
          )
      }

      this.setState({
          preferences: resultArray
      })

      console.log(resultArray)
    }

    onSubmit(){
        let uid = sessionStorage.getItem('currentUID');

        const profile = {
            username: this.state.username,
            email: this.state.email,
            preferences: this.state.preferences
        }

        console.log(profile);

        axios.post( config.api_url + 'profiles/update/' + uid, profile)
         .then(res => console.log(res.data));
    }

    
    
    render(){
          
        return (
        <div class="container text-center">
          <h1>Welcome {this.state.username}!</h1>
          <h5>Select your dietary preferences below, so Mynu can automatically filter for you.</h5>
          <List>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("vegetarian")} onChange={e=>this.onChangePreference(e.target.checked, "vegetarian")}/>} label="Vegetarian" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("eggs")} onChange={e=>this.onChangePreference(e.target.checked, "eggs")}/>} label="Egg Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("vegan")} onChange={e=>this.onChangePreference(e.target.checked, "vegan")}/>} label="Vegan" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("gluten")} onChange={e=>this.onChangePreference(e.target.checked, "gluten")}/>} label="Gluten Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("tree nuts")} onChange={e=>this.onChangePreference(e.target.checked, "tree nuts")}/>} label="Tree Nut Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("wheat")} onChange={e=>this.onChangePreference(e.target.checked, "wheat")}/>} label="Wheat Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("dairy")} onChange={e=>this.onChangePreference(e.target.checked, "dairy")}/>} label="Dairy Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("fish")} onChange={e=>this.onChangePreference(e.target.checked, "fish")}/>} label="Fish Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("soy")} onChange={e=>this.onChangePreference(e.target.checked, "soy")}/>} label="Soy Free" /></ListItem>
              <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("crustacean")} onChange={e=>this.onChangePreference(e.target.checked, "crustacean")}/>} label="Crustacean Shellfish Free"/></ListItem>   
          </List>
          <Button variant = "contained" onClick ={this.onSubmit} component={Link} to = "/menu">Submit</Button>
          <Button variant='contained' onClick={() => {this.setState({preferences: []})}}> Reset </Button>
        </div>
        );
  }
}