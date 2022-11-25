const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const IngredientSchema = new Schema({
//     name: String
// });

const MenuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    allergens: [{
        required: false,
        type: String
    }],
    dining_hall: { //camelcase?
        type: String,
        required: false,
    },
    meal: [{
        type: String,
        required: false
    }]
});

const MenuItem = mongoose.model('Menu Item', MenuItemSchema);

module.exports = MenuItem;