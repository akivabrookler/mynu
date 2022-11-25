// import React from "react";
// import { Component} from 'react';

// export default class MenuItems extends Component {

// 	// Constructor
// 	constructor(props) {
// 		super(props);

// 		this.state = {
// 			items: [],
// 			DataisLoaded: false
// 		};
// 	}

// 	// ComponentDidMount is used to
// 	// execute the code
// 	componentDidMount() {
// 		fetch("http://localhost:5000/menu_items")
// 			.then((res) => res.json())
// 			.then((json) => {
// 				this.setState({
// 					items: json,
// 					DataisLoaded: true
// 				});
// 			})
// 	}
// 	render() {
// 		const { DataisLoaded, items } = this.state;
// 		if (!DataisLoaded) return <div>
// 			<h1> Pleses wait some time.... </h1> </div> ;

// 		return (
// 		<div className = "App">
// 			<h1> Fetch data from an api in react </h1> {
// 				items.map((item) => (
// 				<ol key = { item.id } >
// 					Name: { item.name },
// 					Allergens: { item.allergens }
//                     Dining Hall: { item.dining_hall }
//                     Meal: {item.meal }
// 				</ol>
// 				))
// 			}
// 		</div>
// 	);
// }


// }

// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';

// // import Table from "./Table";
// // // import "./App.css";

// // export default class MenuItems extends Component {

// //     App() {
// //     // data state to store the TV Maze API data. Its initial value is an empty array
// //     const [data, setData] = useState([]);

// //     // Using useEffect to call the API once mounted and set the data
// //     useEffect(() => {
// //         (async () => {
// //         const result = await axios("http://localhost:3000/menu");
// //         setData(result.data);
// //         })();
// //     }, []);

// //     return (
// //         <div className="App"></div>
// //     );
// //     }
// // }


////////////////////////////////
import { Component} from 'react';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';




export default class MenuList extends Component {
    constructor (props){
        super(props);
        // this.state = {items:[]};
        this.state = {items: new Array()};

    }
    async componentDidMount(){
        let items = [];
        await axios.get('http://localhost:5000/menuItems/')
            .then(response => {
                for (let i in response.data){
                    //console.log(response.data[i].name)
                    items.push(response.data[i].name);
                }
                console.log("For loop");
                console.log(items.length);
            })
            .catch((error) => {
            console.log(error);
            });
        this.setState({items: items});
    }

    render(){
        let items= this.state.items;
        let itemList=[];
        items.forEach((item,index)=>{
          itemList.push( <ListItemButton key={index} class = "list-group-item">{item}</ListItemButton>)
        })


        return (
            <div class="container text-center">
                <div class="row">
                    <div class="col-sm">
                        <h3>Menu Items</h3>
                        <List class="list-group">
                            {itemList}
                        </List>
                    </div>
                    <div class="col-sm-2">
                        <p>SECOND COLUMN</p>
                        <List>
                            <FormControlLabel control={<Checkbox />} label="Label" />
                        </List>
                    </div>
                </div>
            </div>            
        );
    }
}