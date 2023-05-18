var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

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

  console.log("Body", req.body)

  User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('visitedCountries')
    .then((updatedUser) => {

      // Deconstruct the user object to omit the password
      const { _id, email, fullName, location, age, profilePic, visitedCountries } = updatedUser;

      // Create an object that will be set as the token payload
      const payload = { _id, email, fullName, location, age, profilePic, visitedCountries };

      const authToken = jwt.sign( 
        payload,
        process.env.SECRET,
        { algorithm: 'HS256', expiresIn: "6h" }
      );

          // Send the token as the response
          res.status(200).json({ authToken: authToken, user: payload });
    })
    .catch((err) => {
      console.log(err)
    })

})

module.exports = router;
