var express = require('express');
var router = express.Router();

const Country = require('../models/Country')
const User = require('../models/User')

const isAuthenticated = require('../middleware/isAuthenticated')


router.post('/create', isAuthenticated, (req, res, next) => {

    Country.find({commonName: req.body.commonName})
        .then((foundCountry) => {
            if (!foundCountry) {

                Country.create(req.body)
                    .then((createdCountry) => {

                        User.findByIdAndUpdate(req.user._id, {
                            $push: {visitedCountries: createdCountry._id}
                        })

                        res.json(createdCountry)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            
            User.findByIdAndUpdate(req.user._id, {
                $push: {visitedCountries: foundCountry._id}
            })

            res.json(foundCountry)
        })
        .catch((err) => {
            console.log(err)
        })

})

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