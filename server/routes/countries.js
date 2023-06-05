var express = require('express');
var router = express.Router();

const jwt = require("jsonwebtoken");

const Country = require('../models/Country')
const User = require('../models/User')

const isAuthenticated = require('../middleware/isAuthenticated')


router.post("/create", isAuthenticated, (req, res, next) => {
  console.log("req body", req.body);

  Country.findOne({ officialName: req.body.officialName })
    .then((foundCountry) => {
      console.log("line 17");
      console.log("founD COUNTRY", foundCountry);

      if (foundCountry) {
        User.findByIdAndUpdate(
          req.user._id,
          {
            $addToSet: { visitedCountries: foundCountry._id },
          },
          { new: true }
        )
        .populate('visitedCountries')
          .then((updatedUser) => {

            const { _id, email, fullName, location, age, profilePic, visitedCountries } = updatedUser;

            const payload = { _id, email, fullName, location, age, profilePic, visitedCountries };
      
            const authToken = jwt.sign( 
              payload,
              process.env.SECRET,
              { algorithm: 'HS256', expiresIn: "6h" }
            );

                res.status(200).json({ authToken: authToken, user: payload });
          })
          .catch((err) => {
            console.log(err);
          });

      } else {

          console.log("No Found Country");
    
          Country.create(req.body)
          .then((createdCountry) => {
            User.findByIdAndUpdate(
              req.user._id,
              {
                $push: { visitedCountries: createdCountry._id },
              },
              { new: true }
            )
            .populate('visitedCountries')
              .then((updatedUser) => {
                    const { _id, email, fullName, location, age, profilePic, visitedCountries } = updatedUser;

                    const payload = { _id, email, fullName, location, age, profilePic, visitedCountries };

                    const authToken = jwt.sign( 
                        payload,
                        process.env.SECRET,
                        { algorithm: 'HS256', expiresIn: "6h" }
                    );
                        res.status(200).json({ authToken: authToken, user: payload });
              })
              .catch((err) => {
                console.log(err);
              });
          });
      }

    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/detail/:name', (req, res, next) => {
    Country.find({commonName: req.params.name})
        .then((foundCountry) => {
            res.json(foundCountry)
        })
        .catch((err) => {
            console.log(err)
        })
}) 


module.exports = router;