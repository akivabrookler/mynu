import React, { Component } from 'react';
import axios from 'axios';
import { allergens } from '../utils/allergens';
import { FormControlLabel, Checkbox, Button, ListItem, List, Stack } from '@mui/material';
import { Link } from "react-router-dom";



const config = require('../config.json')

export default class Profile extends Component {
  constructor(props) {
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

    axios.get(config.api_url + 'profiles/' + uid)
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

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePreference = (state, preference) => {
    let resultArray = []
    if (state) {
      resultArray = this.state.preferences.filter(CheckedId =>
        CheckedId !== preference
      )
      resultArray.push(preference)
    }
    else {
      resultArray = this.state.preferences.filter(CheckedId =>
        CheckedId !== preference
      )
    }

    this.setState({
      preferences: resultArray
    })

    console.log(resultArray)
  }

  onSubmit() {
    let uid = sessionStorage.getItem('currentUID');

    const profile = {
      username: this.state.username,
      email: this.state.email,
      preferences: this.state.preferences
    }

    console.log(profile);

    axios.post(config.api_url + 'profiles/update/' + uid, profile)
      .then(res => console.log(res.data));
  }



  render() {

    return (
      <div class="container text-center">
        <h1>Welcome {this.state.username}!</h1>
        <h5>Select your dietary and dining hall preferences below, so Mynu can automatically filter for you.</h5>
        <div class="d-flex-column col-12 p-3">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="base-line"
              spacing={2}>
              <h4 class="text-center align-bottom font-weight-bold" ><u>Dietary Restrictions</u></h4>
              <List>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("vegetarian")} onChange={e => this.onChangePreference(e.target.checked, "vegetarian")} />} label="Vegetarian" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("eggs")} onChange={e => this.onChangePreference(e.target.checked, "eggs")} />} label="Egg Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("vegan")} onChange={e => this.onChangePreference(e.target.checked, "vegan")} />} label="Vegan" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("gluten")} onChange={e => this.onChangePreference(e.target.checked, "gluten")} />} label="Gluten Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("tree nuts")} onChange={e => this.onChangePreference(e.target.checked, "tree nuts")} />} label="Tree Nut Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("wheat")} onChange={e => this.onChangePreference(e.target.checked, "wheat")} />} label="Wheat Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("dairy")} onChange={e => this.onChangePreference(e.target.checked, "dairy")} />} label="Dairy Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("fish")} onChange={e => this.onChangePreference(e.target.checked, "fish")} />} label="Fish Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("soy")} onChange={e => this.onChangePreference(e.target.checked, "soy")} />} label="Soy Free" /></ListItem>
                <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("crustacean")} onChange={e => this.onChangePreference(e.target.checked, "crustacean")} />} label="Crustacean Shellfish Free" /></ListItem>
              </List>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="base-line"
              spacing={2}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="base-line"
                spacing={2}>
                <h4 class="text-center align-bottom font-weight-bold" ><u>Dining Hall</u></h4>
                <List>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("BPlate")} onChange={e => this.onChangePreference(e.target.checked, "BPlate")} />} label="BPlate" /></ListItem>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("Epicuria")} onChange={e => this.onChangePreference(e.target.checked, "Epicuria")} />} label="Epicuria" /></ListItem>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("BCafe")} onChange={e => this.onChangePreference(e.target.checked, "BCafe")} />} label="BCafe" /></ListItem>
                </List>
              </Stack>

              <Stack
                direction="column"
                justifyContent="center"
                alignItems="base-line"
                spacing={2}>
                <h4 class="text-center align-bottom font-weight-bold" ><u>Meal Time</u></h4>
                <List>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("breakfast")} onChange={e => this.onChangePreference(e.target.checked, "breakfast")} />} label="breakfast" /></ListItem>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("lunch")} onChange={e => this.onChangePreference(e.target.checked, "lunch")} />} label="lunch" /></ListItem>
                  <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.preferences.includes("dinner")} onChange={e => this.onChangePreference(e.target.checked, "dinner")} />} label="dinner" /></ListItem>
                </List>
              </Stack>
            </Stack>

          </Stack>
        </div>
        <Button
          sx={{
            margin: 2
          }}
          variant="contained" onClick={this.onSubmit} component={Link} to="/menu">Save</Button>
        <Button
          variant='contained' onClick={() => { this.setState({ preferences: ["BPlate", "Epicuria", "BCafe", "breakfast", "lunch", "dinner"] }) }}> Reset </Button>
      </div>
    );
  }
}