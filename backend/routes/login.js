const router = require('express').Router();
let Login = require('../models/login.model');

router.route('/').get((req, res) =>{
    Login.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    // const img = req.body.img;
    const newLogin = new Login({name, email});

    newLogin.save()
        .then(() => res.json('User authorized!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
