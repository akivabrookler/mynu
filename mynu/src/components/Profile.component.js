import React, { Component } from 'react';
import axios from 'axios';
import { allergens } from '../utils/allergens';

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

      axios.get('http://localhost:5000/profiles/' + uid)
        .then(response => {
          this.setState({
            username: response.data.name,
            email: response.data.email,
            preferences: response.data.preferences
          })
        })
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangePreference = (e) => {
     let resultArray = []
     if(e.target.checked)
     {
        resultArray = this.state.preferences.filter(CheckedId=>
            CheckedId !== e.target.value
        )
        resultArray.push(e.target.value)
     }
     else
     {
        resultArray = this.state.preferences.filter(CheckedId=>
            CheckedId !== e.target.value
        )
     }

     this.setState({
        preferences: resultArray
     })

     console.log(resultArray)
    }

    onSubmit(e){
        e.preventDefault();
        let uid = sessionStorage.getItem('currentUID');

        const profile = {
            username: this.state.username,
            email: this.state.email,
            preferences: this.state.preferences
        }

        console.log(profile);

        axios.post('http://localhost:5000/profiles/update/' + uid, profile)
         .then(res => console.log(res.data));

        this.setState({
            username: '',
            email: '', 
            checkboxes: Array(allergens.length).fill(false),
            preferences: []
        })
    }

    
    
    render(){
          
        return (
        <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Username    
            <input
              type="text"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </label>
          <label>
          Select Preferences
          {allergens.map(({name}, index) => {
            return (
                <li key={index}>
                <div className='allergens-list-item'>
                 <input 
                 type="checkbox"
                 id={`custom-checkbox-${index}`}
                 name={name}
                 value={name}
                 checked={this.state.checkboxes[index]}
                 onChange={this.onChangePreference}
                 />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                </li>
            )
          })}
          </label>
          <button type="submit">Submit</button>
        </form>
        </div>
        );
  }
}