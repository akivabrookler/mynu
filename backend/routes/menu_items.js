import { getMenuBySearch } from "./items.js"

const router = require('express').Router();
let Menu_Item = require('../models/menu_item.model');

router.route('/').get((req, res) =>{
    Menu_Item.find()
        .then(menu_items => res.json(menu_items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/search', getMenuBySearch);

module.exports = router;