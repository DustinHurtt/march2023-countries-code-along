var express = require('express');
var router = express.Router();

const Country = require('../models/Country')


router.post('/create', (req, res, next) => {

    Country.find({commonName: req.body.commonName})
        .then((foundCountry) => {
            if (!foundCountry) {
                Country.create(req.body)
                    .then((createdCountry) => {
                        res.json(createdCountry)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
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