const router = require('express').Router();
let Profile = require('../models/profile.model');

router.route('/').get((req, res) => {
    Profile.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const preferences = req.body.preferences;
const newProfile = new Profile({username, email, preferences});

    newProfile.save()
        .then(() => res.json('Profile added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;