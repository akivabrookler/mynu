import {FormControlLabel, Checkbox, TextField, ListItem, ListItemButton, List, FormControl} from '@mui/material';
import React, { Component }  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


export default class MenuList extends Component {
    constructor (props){
        super(props);
        // this.state = {items:[]};
        this.state = {
            ids: new Array(),
            items: new Array(),
            vegetarian: false,
            eggFree: false,
            vegan: false,
            glutenFree: false,
            treeNutFree: false,
            wheatFree: false,
            dairyFree: false,
            fishFree: false,
            pescatarian: false,
            soyFree: false,
            crustaceanShellfishFree: false,
            search: "",
        };

    }

    async componentDidMount(){
        let items = [];
        let ids =[];
        await axios.get('http://localhost:5000/menu_items/')
            .then(response => {
                for (let i in response.data){
                    items.push(response.data[i].name);
                    ids.push(response.data[i]._id);
                }
                console.log("For loop");
                console.log(items.length);
            })
            .catch((error) => {
            console.log(error);
            });
        this.setState({items: items, ids:ids});
    }

    async handleFilter(){
        let items = [];
        let ids =[];
        await axios.get('http://localhost:5000/menu_items/')
            .then(response => {
                for (let i in response.data){
                    if( (!this.state.search || (response.data[i].name).toLowerCase().includes((this.state.search))) &&
                        (!this.state.vegetarian || response.data[i].allergens.includes("vegan") || response.data[i].allergens.includes("vegetarian")) &&
                        (!this.state.eggFree || !response.data[i].allergens.includes("eggs")) &&
                        (!this.state.vegan || response.data[i].allergens.includes("vegan")) &&
                        (!this.state.glutenFree || !response.data[i].allergens.includes("gluten")) &&
                        (!this.state.treeNutFree || !response.data[i].allergens.includes("tree nuts")) &&
                        (!this.state.wheatFree || !response.data[i].allergens.includes("wheat")) &&
                        (!this.state.fishFree || !response.data[i].allergens.includes("fish")) &&
                        //NEED TO ADD MEAT AS ALERGEN FOR PESCETARIAN
                        (!this.state.soyFree || !response.data[i].allergens.includes("soy")) &&
                        (!this.state.crustaceanShellfishFree || !response.data[i].allergens.includes("crustacean shellfish")) 
                    ){
                        items.push(response.data[i].name);
                        ids.push(response.data[i]._id);
                    }

                }
                console.log("For loop");
                console.log(items.length);
            })
            .catch((error) => {
            console.log(error);
            });
        this.setState({items: items, ids:ids});
    }


    render(){
        let items= this.state.items;
        let ids = this.state.ids;
        let itemList=[];
        items.forEach((item,index)=>{
          itemList.push( <ListItemButton key={index} class = "list-group-item" onClick ={()=>{console.log("Clicked")}} component={Link} to = {"/menu/" + ids[index]}>{item}</ListItemButton>)
        })


        return (
            <div class="container text-center">
                <div class="d-flex-row align-content-center p-3">
                        <h1 class='shadow-lg bg-info text-light'>Menu Items</h1>
                            <FormControl fullWidth>
                                <FormControlLabel labelPlacement="top" control={<TextField label="Search Menu" />} onChange= {event => this.setState({search: (event.target.value).toLowerCase()}, this.handleFilter)}/>
                            </FormControl>
                            
                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex-column col-6">
                            
                            <List class="list-group">
                                {itemList}
                            </List>
                    </div>
                    <div class="d-flex-column col-6 p-3">
                        <div class="p-3 d-flex-column bg-light">
                            <h6 class = "text-center align-bottom font-weight-bold" >Dietary Restrictions</h6>
                            <List>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegetarian: e.target.checked}, this.handleFilter)}}/>} label="Vegetarian" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ eggFree: e.target.checked}, this.handleFilter)}}/>} label="Egg Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegan: e.target.checked}, this.handleFilter)}}/>} label="Vegan" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ glutenFree: e.target.checked}, this.handleFilter)}}/>} label="Gluten Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ treeNutFree: e.target.checked}, this.handleFilter)}}/>} label="Tree Nut Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ wheatFree: e.target.checked}, this.handleFilter)}}/>} label="Wheat Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ dairyFree: e.target.checked}, this.handleFilter)}}/>} label="Dairy Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ fishFree: e.target.checked}, this.handleFilter)}}/>} label="Fish Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ pescatarian: e.target.checked}, this.handleFilter)}}/>} label="Pescatarian" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ soyFree: e.target.checked}, this.handleFilter)}}/>} label="Soy Free" /></ListItem>
                                <ListItem ><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ crustaceanShellfishFree: e.target.checked}, this.handleFilter)}}/>} label="Crustacean Shellfish Free"/></ListItem>   
                            </List>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }
}