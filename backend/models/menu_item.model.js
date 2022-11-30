const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
    name: String
});

const MenuItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: [IngredientSchema],
    dislikes: 0,
    likes: 0
});

const Menu_Item = mongoose.model('Menu Item', MenuItemSchema);

module.exports = Menu_Item;
