var express = require('express');
var router = express.Router();

const User = require('../models/User')

router.get('/details/:id', (req, res, next) => {

  User.findById(req.params.id)
    .populate('visitedCountries')
    .then((foundUser) => {
        res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
    })

})

router.post('/update/:id', (req, res, next) => {

  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedUser) => {
      res.json(updatedUser)
    })
    .catch((err) => {
      console.log(err)
    })

})

module.exports = router;
