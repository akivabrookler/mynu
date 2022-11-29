
const router = require('express').Router();
let Profile = require('../models/profile.model');

router.route('/').get((req, res) =>{
    Profile.find()
        .then(profiles => res.json(profiles))
        .catch(err => res.status(400).json('Error: ' + err));   
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    
    Profile.findOne({ email: email }, function(err, profile) {
        if(err) {
           res.status(400).json('Error: ' + err)
        }

        if (profile) {
            res.json("Existing User: " + profile._id)   
        } else {
            const newProfile = new Profile({username, email});

            newProfile.save()
                .then(() => res.json(newProfile._id))
                .catch(err => res.status(400).json('Error: ' + err));
        }
     }); 
});


router.route('/:id').get((req,res) => {
    Profile.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
