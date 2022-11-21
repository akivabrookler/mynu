import React, { Component } from 'react';
import axios from 'axios';
import { allergens } from '../utils/allergens';

export default class CreateProfile extends Component {
    constructor(props){
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePreference = this.onChangePreference.bind(this);

        this.state = {
          username: '',
          email: '',
          preferences: [],
          checkboxes: Array(allergens.length)
      }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
    }

    onChangePreference(e){      
      let newArray = [...this.state.checkboxes, e.target.value];
      if (this.state.checkboxes.includes(e.target.value)) {
        newArray =  newArray.filter(preference => preference != e.target.value);
      }
      this.setState({preferences: newArray});
    }

    onSubmit(e){
        e.preventDefault();

        const profile = {
            username: this.state.username,
            email: this.state.email,
            preferences: this.state.preferences
        }

        console.log(profile);

        axios.post('http://localhost:5000/profiles/add', profile)
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
            Email
            <input
              type="text"
              value={this.state.email}
              onChange={this.onChangeEmail}
            />
          </label>
          <label>
          Select Preferences
          {allergens.map(({name, value}, index) => {
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
          <button type="submit">Create Profile</button>
        </form>
        </div>
        );
  }
}