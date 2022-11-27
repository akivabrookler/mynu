import { Component} from 'react';
import axios from 'axios';

export default class MenuItem extends Component {

    constructor(props) {
        super(props);  
        this.state = {
            id: '',
            name: '',
            allergens: '',
            dining_hall: '',
            meal: []      
        };
    }

    async componentDidMount() {
    console.log("Called mount")
    let id =(window.location.pathname).replace("/menu/","");
    await axios.get('http://localhost:5000/menu_items/' + id)
        .then(response => {
        this.setState({
            id: response.data.id,
            name: response.data.name,
            allergens: response.data.allergens,
            dining_hall: response.data.allergens,
            meal: response.data.meal
            })
        })
        .catch((error) => {
        console.log(error);
        })
    }
    


    render(){
        return (
            <div>
                <p>{this.state.name}</p>
                
            </div>
        );
    }
}