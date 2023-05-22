var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

const fileUploader = require("../middleware/cloudinary")

const User = require('../models/User')
const Post = require('../models/Post')

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

router.post('/update/:id', fileUploader.single("profilePic"), (req, res, next) => {

  User.findByIdAndUpdate(req.params.id, req.body,{new: true})
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

router.post('/imageUpload', fileUploader.single("image"), (req, res, next) => {
  
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  console.log("this is file", req.file)
  res.json({ image: req.file.path });
  
})

router.get('/posts/:id', (req, res, next) => {

  Post.find({author: req.params.id})
    .then((foundPosts) => {
      res.json(foundPosts)
    })
    .catcj((err) => {
      console.log(err)
    })

})

module.exports = router;
