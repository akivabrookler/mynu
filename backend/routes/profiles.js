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

router.route('/:id').get((req,res) => {
    Profile.findById(req.params.id)
        .then(profile => res.json(profile))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Profile.findByIdAndDelete(req.params.id)
        .then(() => res.json('Profile deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}); 

router.route('/update/:id').post((req, res) => {
    Profile.findById(req.params.id)
      .then(profile => {
        profile.username = req.body.username;
        profile.email = req.body.email;
        profile.preferences = req.body.preferences;

        profile.save()
          .then(() => res.json('Profile updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;