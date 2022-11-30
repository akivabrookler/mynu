import Checkbox from '@mui/material/Checkbox';
import {FormControlLabel, TextField, ListItem, ListItemButton, List} from '@mui/material';
import { Component} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


export default class MenuList extends Component {
    constructor (props){
        super(props);
        // this.state = {items:[]};
        this.state = {
            ids: new Array(),
            items: new Array(),
            likes: new Array(),
            dislikes: new Array(),
            liked: new Array(),
            disliked: new Array(),
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
            itemStructArray: []
        };
    }


    async componentDidMount(){
        let items = [];
        let ids =[];
        let likes =[];
        let dislikes=[];
        let liked = [];
        let disliked = [];
        let itemStructArray = []
        await axios.get('http://localhost:5000/menu_items/')
            .then(response => {
                for (let i in response.data){
                    items.push(response.data[i].name);
                    ids.push(response.data[i]._id);
                    likes.push(response.data[i].likes);
                    dislikes.push(response.data[i].dislikes);
                    liked.push(response.data[i].liked);
                    disliked.push(response.data[i].disliked);
                    const itemStruct = {
                        name: response.data[i].name,
                        likes: response.data[i].likes,
                        dislikes: response.data[i].dislikes
                    }
                    itemStructArray.push(itemStruct)
                }
                console.log("For loop");
                console.log(items.length);
            })
            .catch((error) => {
            console.log(error);
            });
        this.setState({items: items, ids:ids, likes: likes, dislikes: dislikes, liked: liked, disliked, disliked, itemStructArray: itemStructArray});
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
        let likes = this.state.likes;   
        let dislikes = this.state.dislikes;
        let liked = this.state.liked;
        let disliked = this.state.disliked;
        let itemList=[];    
        // let itemMap = items.map(item => [])
        // items.forEach((item, index)=>{
        //     itemMap.set(item, [likes[index], dislikes[index]])
        // })
        this.state.itemStructArray.forEach((item,index)=>{
            let clickedLikeColoring = (liked[index] == true) ? "primary" : "";
            let clickedDislikeColoring = (disliked[index] == false) ? "error" : "";
          itemList.push(
          <ListItemButton key={index} class = "list-group-item" onClick ={()=>{console.log("Clicked")}} component={Link} to = {"/menu/" + ids[index]}>
            <div class="row">
                <div class="col-sm">
                    {/* {item.name} */}
                    {item.name}
                </div>
                <div class="col-sm-5">
                    {/* {itemMap.get('item')[0]}<ThumbUpIcon sx = {{align: 'flex-end'}} color= "clickedLikeColoring"/>
                    {itemMap.get('item')[1]}<ThumbDownIcon sx = {{align: 'flex-end'}} color= "clickedDislikeColoring"/> */}
                    {/* {likes[index]}<ThumbUpIcon sx = {{align: 'flex-end'}} color= "clickedLikeColoring"/>
                    {dislikes[index]}<ThumbDownIcon sx = {{align: 'flex-end'}} color= "clickedDislikeColoring"/> */}
                    {item.likes}
                    {item.dislikes}
            </div>  
            </div>

            {/* {likes}<ThumbUpIcon sx = {{align: 'flex-end'}} color= "primary"/>{dislikes}<ThumbDownIcon color= "error"/> */}
          </ListItemButton>)
        })




        return (
            <div class="container text-center">
                <div class="row">
                    <div class="col-sm-2">
                        <h6><u>Items that meet criteria:</u></h6>
                        <List class="list-group">
                            <span class="border border-success">
                                {itemList.length}
                            </span>
                        </List>
                    </div>
                    <div class="col-sm-8">
                        <h3><u>Menu Items</u></h3>
                        <List class="list-group">
                            {itemList}
                        </List>
                    </div>
                    <div class="col-sm">
                        <FormControlLabel control={<TextField label="Search Menu" />} onChange= {event => this.setState({search: (event.target.value).toLowerCase()}, this.handleFilter)}/>
                        <div class="bg-light">
                        <p><u>Dietary Restrictions</u></p>
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
//         return (
//             <div class="container text-center">
//                 <div class="row">
//                     <div class="col-sm">
//                         <h>Menu Items</h>
//                         <List class="list-group">
//                             {itemList}
//                         </List>
//                     </div>
//                     <div class="col-sm-2">
//                         <FormControlLabel control={<TextField label="Search Menu" />} onChange= {event => this.setState({search: (event.target.value).toLowerCase()}, this.handleFilter)}/>
//                         <div class="bg-light">
//                         <p>Dietary Restrictions</p>
//                         <List>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegetarian: e.target.checked}, this.handleFilter)}}/>} label="Vegetarian" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ eggFree: e.target.checked}, this.handleFilter)}}/>} label="Egg Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ vegan: e.target.checked}, this.handleFilter)}}/>} label="Vegan" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ glutenFree: e.target.checked}, this.handleFilter)}}/>} label="Gluten Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ treeNutFree: e.target.checked}, this.handleFilter)}}/>} label="Tree Nut Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ wheatFree: e.target.checked}, this.handleFilter)}}/>} label="Wheat Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ dairyFree: e.target.checked}, this.handleFilter)}}/>} label="Dairy Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ fishFree: e.target.checked}, this.handleFilter)}}/>} label="Fish Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ pescatarian: e.target.checked}, this.handleFilter)}}/>} label="Pescatarian" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ soyFree: e.target.checked}, this.handleFilter)}}/>} label="Soy Free" /></ListItem>
//                             <ListItem disablePadding><FormControlLabel control={<Checkbox size="Medium" onChange={e=>{this.setState({ crustaceanShellfishFree: e.target.checked}, this.handleFilter)}}/>} label="Crustacean Shellfish Free"/></ListItem>   
//                         </List>
//                         </div>
//                     </div>
//                 </div>
//             </div>            
//         );
    }
}