import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, TextField, ListItem, ListItemButton, List} from '@mui/material';
import { Component} from 'react';
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
                    )
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


    render(){
        let items= this.state.items;
        let ids = this.state.ids;
        let itemList=[];
        items.forEach((item,index)=>{
          itemList.push( <ListItemButton key={index} class = "list-group-item" onClick ={()=>{console.log("Clicked")}} component={Link} to = {"/menu/" + ids[index]}>{item}</ListItemButton>)
        })


        return (
            <div class="container text-center">
                <div class="row">
                    <div class="col-sm">
                        <h>Menu Items</h>
                        <List class="list-group">
                            {itemList}
                        </List>
                    </div>
                    <div class="col-sm-2">
                        <FormControlLabel control={<TextField label="Search Menu" />} onChange= {event => this.setState({search: (event.target.value).toLowerCase()}, this.handleFilter)}/>
                        <div class="bg-light">
                        <p>Dietary Restrictions</p>
                        <List>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegetarian: e.target.checked}, this.handleFilter)}}/>} label="Vegetarian" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ eggFree: e.target.checked}, this.handleFilter)}}/>} label="Egg Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegan: e.target.checked}, this.handleFilter)}}/>} label="Vegan" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ glutenFree: e.target.checked}, this.handleFilter)}}/>} label="Gluten Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ treeNutFree: e.target.checked}, this.handleFilter)}}/>} label="Tree Nut Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ wheatFree: e.target.checked}, this.handleFilter)}}/>} label="Wheat Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ dairyFree: e.target.checked}, this.handleFilter)}}/>} label="Dairy Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ fishFree: e.target.checked}, this.handleFilter)}}/>} label="Fish Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ pescatarian: e.target.checked}, this.handleFilter)}}/>} label="Pescatarian" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ soyFree: e.target.checked}, this.handleFilter)}}/>} label="Soy Free" /></ListItem>
                            <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ crustaceanShellfishFree: e.target.checked}, this.handleFilter)}}/>} label="Crustacean Shellfish Free"/></ListItem>   
                        </List>
                        </div>
                    </div>
                </div>
            </div>            
        );
    }
}