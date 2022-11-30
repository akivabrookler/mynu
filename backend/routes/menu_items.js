const router = require('express').Router();
let Menu_Item = require('../models/menu_item.model');

router.route('/').get((req, res) =>{
    Menu_Item.find()
        .then(menu_items => res.json(menu_items))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Menu_Item.findById(req.params.id)
        .then(menuItem => res.json(menuItem))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/likeinc/:id').post((req, res) => {
    Menu_Item.findById(req.params.id)
      .then(menuItem => {
        menuItem.likes += 1;
        menuItem.save()
            .then(() => res.json('Like incremented!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/likedec/:id').post((req, res) => {
    Menu_Item.findById(req.params.id)
      .then(menuItem => {
        menuItem.likes -= 1;
        menuItem.save()
            .then(() => res.json('Like decremented!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/dislikeinc/:id').post((req, res) => {
    Menu_Item.findById(req.params.id)
      .then(menuItem => {
        menuItem.dislikes += 1;
        menuItem.save()
            .then(() => res.json('Dislike incremented!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/dislikedec/:id').post((req, res) => {
    Menu_Item.findById(req.params.id)
      .then(menuItem => {
        menuItem.dislikes -= 1;
        menuItem.save()
            .then(() => res.json('Dislike decremented!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;
