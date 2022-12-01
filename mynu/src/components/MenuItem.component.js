import React, { Component } from 'react';
import axios from 'axios';
import { ListItem, List, IconButton, ButtonGroup, Stack, Chip } from '@mui/material';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import './MenuItem.css';
const config = require('../config.json')

export default class MenuItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            allergens: [],
            dining_hall: '',
            meal: [],
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false
        };
        this.handleLike = this.handleLike.bind(this);
        this.handleDisike = this.handleDislike.bind(this);

    }

    async componentDidMount() {
        console.log("Called mount")
        let id = (window.location.pathname).replace("/menu/", "");
        await axios.get(config.api_url + 'menu_items/' + id)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    name: response.data.name,
                    allergens: response.data.allergens,
                    dining_hall: response.data.dining_hall,
                    meal: response.data.meal,
                    likes: response.data.likes,
                    dislikes: response.data.dislikes
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    async handleLike() {

        if (sessionStorage.getItem('currentUID') == null) {
            return
        }
        let liked = this.state.liked;
        let likes = this.state.likes
        let disliked = this.state.disliked;
        let dislikes = this.state.dislikes

        console.log(this.state)
        let id = (window.location.pathname).replace("/menu/", "");
        if (this.state.liked) {
            await axios.post(config.api_url + 'menu_items/likedec/' + id, {})
                .then(function (response) {
                    console.log(response);
                    liked = false;
                    likes -= 1;
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            await axios.post(config.api_url + 'menu_items/likeinc/' + id, {})
                .then(function (response) {
                    console.log(response);
                    liked = true;
                    likes += 1;

                })
                .catch(function (error) {
                    console.log(error);
                });
            if (this.state.disliked) {
                await axios.post(config.api_url + 'menu_items/dislikedec/' + id, {})
                    .then(function (response) {
                        console.log(response);
                        disliked = false;
                        dislikes -= 1;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        this.setState({ liked: liked, likes: likes, disliked: disliked, dislikes: dislikes });
    }

    async handleDislike() {

        if (sessionStorage.getItem('currentUID') == null) {
            return
        }

        let disliked = this.state.disliked;
        let dislikes = this.state.dislikes
        let liked = this.state.liked;
        let likes = this.state.likes

        console.log(this.state)
        let id = (window.location.pathname).replace("/menu/", "");
        if (this.state.disliked) {
            await axios.post(config.api_url + 'menu_items/dislikedec/' + id, {})
                .then(function (response) {
                    console.log(response);
                    disliked = false;
                    dislikes -= 1;
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            await axios.post(config.api_url + 'menu_items/dislikeinc/' + id, {})
                .then(function (response) {
                    console.log(response);
                    disliked = true;
                    dislikes += 1;

                })
                .catch(function (error) {
                    console.log(error);
                });
            if (this.state.liked) {
                await axios.post(config.api_url + 'menu_items/likedec/' + id, {})
                    .then(function (response) {
                        console.log(response);
                        liked = false;
                        likes -= 1;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
        this.setState({ liked: liked, likes: likes, disliked: disliked, dislikes: dislikes });
    }



    render() {

        let allergens = this.state.allergens;
        let allergenList = [];
        allergens.forEach((item, index) => {
            allergenList.push(<ListItem key={index} class="list-group-item">
                <Chip label={item} size="medium" color="secondary" />
            </ListItem>)
        })

        let clickedLikeColoring = (this.state.liked) ? "primary" : "";
        let clickedDislikeColoring = (this.state.disliked) ? "error" : "";

        return (
            <div class='background'>
                {/* <h1 class="text-center font-italic font-weight-light">{this.state.name}</h1> */}
                <h1 class="header">
                    {this.state.name}</h1>
                <div class="body">
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        justifyContent="center">
                        <h1 class='subheading'>Dining Hall:</h1>
                        <Chip
                            label={this.state.dining_hall} size="medium" color="secondary" />
                    </Stack>
                    <List>
                        <Stack
                            direction="row" spacing={1}
                            alignItems="center"
                            justifyContent="center">
                            <h1 class='subheading'>Ingredient information:</h1>
                            {allergenList}
                        </Stack>
                    </List>
                    <Stack
                        direction="row" spacing={2}
                        alignItems="center"
                        justifyContent="center">
                        <h1 class='subheading'>Meal times:</h1>
                        <Chip
                            label={this.state.meal} size="medium" color="secondary" />
                    </Stack>
                </div>
                <Stack
                    alignItems="center"
                    justifyContent="center">
                    <ButtonGroup
                        variant="contained" aria-label="outlined primary button group">
                        <IconButton onClick={() => { this.handleLike() }} color={clickedLikeColoring}> {this.state.likes}<ThumbUp /> </IconButton>
                        <IconButton onClick={() => { this.handleDislike() }} color={clickedDislikeColoring}> {this.state.dislikes}<ThumbDown /> </IconButton>
                    </ButtonGroup>
                </Stack>
            </div>
        );
    }
}