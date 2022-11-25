const router = require('express').Router();
let MenuItem = require('../models/menuItem.model');

router.route('/').get((req, res) =>{
    MenuItem.find()
        .then(menuItems => res.json(menuItems))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;