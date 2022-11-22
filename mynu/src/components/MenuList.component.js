import { Component} from 'react';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import axios from 'axios';




export default class MenuList extends Component {
    constructor (props){
        super(props);
        // this.state = {items:[]};
        this.state = {items: new Array()};

    }
    async componentDidMount(){
        let items = [];
        await axios.get('http://localhost:5000/menu_items/')
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
                        <h>Menu Items</h>
                        <List class="list-group">
                            {itemList}
                        </List>
                    </div>
                    <div class="col-sm-2">
                        <p>SECOND CLOMUN</p>
                    </div>
                </div>
            </div>            
        );
    }
}