
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
    
    Login.findOne({ email: email }, function(err, user) {
        if(err) {
           res.status(400).json('Error: ' + err)
        }
        
        //if a user was found, that means the user's email matches the entered email
        if (user) {
            res.json("Existing User")   
        } else {
            const newLogin = new Login({name, email});

            newLogin.save()
                .then(() => res.json(newLogin._id))
                .catch(err => res.status(400).json('Error: ' + err));
        }
     }); 
});


router.route('/:id').get((req,res) => {
    Login.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
