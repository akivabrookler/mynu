import { FormControlLabel, Button, Checkbox, TextField, ListItem, ListItemButton, List, FormControl, Typography } from '@mui/material';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Stack } from '@mui/material';

const config = require('../config.json')

export default class MenuList extends Component {
    constructor(props) {
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
            soyFree: false,
            crustaceanShellfishFree: false,
            search: "",
            best_dining_hall: '',
            dining_halls: [],
            total_item_count: 0,
            BPlate: true,
            Epicuria: true,
            BCafe: true,
            breakfast: true,
            lunch: true,
            dinner: true,
        };

        this.find_best_dining_hall = this.find_best_dining_hall.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    async componentDidMount() {
        let items = [];
        let ids = [];

        // Check for currently logged in profile
        let uid = sessionStorage.getItem('currentUID');
        if (uid !== null) {
            console.log('Logged in profile: ' + uid);
            let _vegetarian = false;
            let _egg = false;
            let _vegan = false;
            let _gluten = false;
            let _tree_nut = false;
            let _wheat = false;
            let _dairy = false;
            let _fish = false;
            let _soy = false;
            let _crustacean = false;
            let _BPlate = false;
            let _Epicuria = false;
            let _BCafe = false;
            let _breakfast = false;
            let _lunch = false;
            let _dinner = false;


            await axios.get(config.api_url + 'profiles/' + uid)
                .then(response => {
                    if (response.data.preferences.includes('vegan')) {
                        _vegan = true;
                    }
                    if (response.data.preferences.includes('vegetarian')) {
                        _vegetarian = true;
                    }
                    if (response.data.preferences.includes('gluten')) {
                        _gluten = true;
                    }
                    if (response.data.preferences.includes('tree nuts')) {
                        _tree_nut = true;
                    }
                    if (response.data.preferences.includes('wheat')) {
                        _wheat = true;
                    }
                    if (response.data.preferences.includes('soy')) {
                        _soy = true;
                    }
                    if (response.data.preferences.includes('dairy')) {
                        _dairy = true;
                    }
                    if (response.data.preferences.includes('eggs')) {
                        _egg = true;
                    }
                    if (response.data.preferences.includes('crustacean')) {
                        _crustacean = true;
                    }
                    if (response.data.preferences.includes('fish')) {
                        _fish = true;
                    }
                    if (response.data.preferences.includes('BPlate')) {
                        _BPlate = true;
                    }
                    if (response.data.preferences.includes('Epicuria')) {
                        _Epicuria = true;
                    }
                    if (response.data.preferences.includes('BCafe')) {
                        _BCafe = true;
                    }
                    if (response.data.preferences.includes('breakfast')) {
                        _breakfast = true;
                    }
                    if (response.data.preferences.includes('lunch')) {
                        _lunch = true;
                    }
                    if (response.data.preferences.includes('dinner')) {
                        _dinner = true;
                    }


                    this.setState({
                        vegetarian: _vegetarian,
                        eggFree: _egg,
                        vegan: _vegan,
                        glutenFree: _gluten,
                        treeNutFree: _tree_nut,
                        wheatFree: _wheat,
                        dairyFree: _dairy,
                        fishFree: _fish,
                        soyFree: _soy,
                        crustaceanShellfishFree: _crustacean,
                        BPlate: _BPlate,
                        BCafe: _BCafe,
                        Epicuria: _Epicuria,
                        breakfast: _breakfast,
                        lunch: _lunch,
                        dinner: _dinner
                    })

                    //console.log(this.state);
                })
        }
        console.log('before');
        await this.handleFilter();
        this.find_best_dining_hall();
        console.log('componentDidMount', this.state);
    }

    async handleFilter() {

        console.log('entered handleFilter');
        let items = [];
        let ids = [];
        let dining_hall = [];

        await axios.get(config.api_url + 'menu_items/')
            .then(response => {
                for (let i in response.data) {
                    if ((!this.state.search || (response.data[i].name).toLowerCase().includes((this.state.search))) &&
                        (!this.state.vegetarian || response.data[i].allergens.includes("vegan") || response.data[i].allergens.includes("vegetarian")) &&
                        (!this.state.eggFree || !response.data[i].allergens.includes("eggs")) &&
                        (!this.state.vegan || response.data[i].allergens.includes("vegan")) &&
                        (!this.state.glutenFree || !response.data[i].allergens.includes("gluten")) &&
                        (!this.state.treeNutFree || !response.data[i].allergens.includes("tree nuts")) &&
                        (!this.state.wheatFree || !response.data[i].allergens.includes("wheat")) &&
                        (!this.state.fishFree || !response.data[i].allergens.includes("fish")) &&
                        (!this.state.soyFree || !response.data[i].allergens.includes("soy")) &&
                        (!this.state.dairyFree || !response.data[i].allergens.includes("dairy")) &&
                        (!this.state.crustaceanShellfishFree || !response.data[i].allergens.includes("crustacean shellfish")) &&
                        (this.state.BPlate || !response.data[i].dining_hall.includes("BPlate")) &&
                        (this.state.BCafe || !response.data[i].dining_hall.includes("BCafe")) &&
                        (this.state.Epicuria || !response.data[i].dining_hall.includes("Epicuria")) &&
                        (this.state.breakfast || !response.data[i].meal.includes("breakfast")) &&
                        (this.state.lunch || !response.data[i].meal.includes("lunch")) &&
                        (this.state.dinner || !response.data[i].meal.includes("dinner"))
                    ) {
                        items.push(response.data[i].name);
                        ids.push(response.data[i]._id);
                        dining_hall.push(response.data[i].dining_hall)
                    }
                }
                console.log("For loop");
                console.log(items.length);
            })
            .catch((error) => {
                console.log(error);
            });


        this.setState({ items: items, ids: ids, dining_halls: dining_hall });
        console.log('inside handleFilter', this.state.best_dining_hall);
    }

    handleChange() {
        this.handleFilter();
        this.find_best_dining_hall();
    }

    find_best_dining_hall () {
        console.log("Entered best dining hall func");
        let diningHalls = {
            "BPlate": this.state.dining_halls.filter(item => item == "BPlate").length,
            "Epicuria": this.state.dining_halls.filter(item => item == "Epicuria").length,
            "BCafe": this.state.dining_halls.filter(item => item == "BCafe").length
        };

        let best = Object.keys(diningHalls).reduce(function (a, b) { return diningHalls[a] > diningHalls[b] ? a : b });

        console.log("BEST");
        console.log([best, diningHalls[best]]);
        this.setState({best_dining_hall: best, total_item_count: diningHalls[best]});
        console.log(best);
        console.log(diningHalls[best]);
        console.log(this.state);
        console.log('inside find_best...', this.state.best_dining_hall, this.state.total_item_count);
        return [best, diningHalls[best]];

    }

    render() {
        let items = this.state.items;
        let ids = this.state.ids;
        let itemList = [];
        items.forEach((item, index) => {
            itemList.push(<ListItemButton key={index} class="list-group-item" onClick={() => { console.log("Clicked") }} component={Link} to={"/menu/" + ids[index]}>{item}</ListItemButton>)
        })



        return (
            <div class="container text-center">
                <div class="d-flex-row align-content-center p-3">
                    <h1 class='shadow-lg bg-info text-light'>Menu Items</h1>
                    <FormControl fullWidth>
                        <FormControlLabel labelPlacement="top" control={<TextField label="Search Menu" />} onChange={event => this.setState({ search: (event.target.value).toLowerCase() }, this.handleChange)} />
                    </FormControl>

                </div>
                <div class="d-flex flex-row">
                    <div class="d-flex-column col-6">
                        <div>
                            <Typography variant='h6' fontWeight={'bold'}>
                                Best Dining Hall: {this.state.best_dining_hall}
                            </Typography>
                        </div>
                        <List class="list-group">
                            {itemList}
                        </List>
                    </div>
                    <div class="d-flex-column col-6 p-3">
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="flex-start"
                            spacing={2}>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}>
                                <h4 class="text-center align-bottom font-weight-bold" ><u>Dietary Restrictions</u></h4>
                                <List>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.vegetarian} onChange={e => { this.setState({ vegetarian: e.target.checked }, this.handleChange) }} />} label="Vegetarian" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.eggFree} onChange={e => { this.setState({ eggFree: e.target.checked }, this.handleChange) }} />} label="Egg Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.vegan} onChange={e => { this.setState({ vegan: e.target.checked }, this.handleChange) }} />} label="Vegan" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.glutenFree} onChange={e => { this.setState({ glutenFree: e.target.checked }, this.handleChange) }} />} label="Gluten Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.treeNutFree} onChange={e => { this.setState({ treeNutFree: e.target.checked }, this.handleChange) }} />} label="Tree Nut Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.wheatFree} onChange={e => { this.setState({ wheatFree: e.target.checked }, this.handleChange) }} />} label="Wheat Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.dairyFree} onChange={e => { this.setState({ dairyFree: e.target.checked }, this.handleChange) }} />} label="Dairy Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.fishFree} onChange={e => { this.setState({ fishFree: e.target.checked }, this.handleChange) }} />} label="Fish Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.soyFree} onChange={e => { this.setState({ soyFree: e.target.checked }, this.handleChange) }} />} label="Soy Free" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.crustaceanShellfishFree} onChange={e => { this.setState({ crustaceanShellfishFree: e.target.checked }, this.handleChange) }} />} label="Crustacean Shellfish Free" /></ListItem>
                                </List>
                            </Stack>
                            <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}>
                                <h4 class="text-center align-bottom font-weight-bold" ><u>Dining Hall</u></h4>
                                <List>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.BPlate} onChange={e => { this.setState({ BPlate: e.target.checked }, this.handleChange) }} />} label="BPlate" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.Epicuria} onChange={e => { this.setState({ Epicuria: e.target.checked }, this.handleChange) }} />} label="Epicuria" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.BCafe} onChange={e => { this.setState({ BCafe: e.target.checked }, this.handleChange) }} />} label="BCafe" /></ListItem>
                                </List>
                                <h4 class="text-center align-bottom font-weight-bold" ><u>Meal Time</u></h4>
                                <List>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.breakfast} onChange={e => { this.setState({ breakfast: e.target.checked }, this.handleChange) }} />} label="breakfast" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.lunch} onChange={e => { this.setState({ lunch: e.target.checked }, this.handleChange) }} />} label="lunch" /></ListItem>
                                    <ListItem ><FormControlLabel control={<Checkbox size="Medium" checked={this.state.dinner} onChange={e => { this.setState({ dinner: e.target.checked }, this.handleChange) }} />} label="dinner" /></ListItem>
                                </List>
                            </Stack>
                        </Stack>
                        <Button variant='contained' onClick={() => {
                            this.setState({
                                vegetarian: false,
                                eggFree: false,
                                vegan: false,
                                glutenFree: false,
                                treeNutFree: false,
                                wheatFree: false,
                                dairyFree: false,
                                fishFree: false,
                                soyFree: false,
                                crustaceanShellfishFree: false,
                                BPlate: true,
                                Epicuria: true,
                                BCafe: true,
                                breakfast: true,
                                lunch: true,
                                dinner: true,
                                
                            },
                            this.handleChange)
                        }}> Reset </Button>
                    </div>
                </div>
            </div>
        );
    }
}