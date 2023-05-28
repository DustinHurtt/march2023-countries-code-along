var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated')

const Post = require('../models/Post')

router.get('/add-like/:id', isAuthenticated, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, {
        $addToSet: {likes: req.user._id}
    },
    {new: true})
    .populate('country author likes')
    .populate({
        path: 'comments', 
        populate: {path: 'author'}
    })
    .then((updatedPost) => {
        res.json(updatedPost)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get('/remove-like/:id', isAuthenticated, (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, {
        $pull: {likes: req.user._id}
    },
    {new: true})
    .populate('country author likes')
    .populate({
        path: 'comments', 
        populate: {path: 'author'}
    })
    .then((updatedPost) => {
        res.json(updatedPost)
    })
    .catch((err) => {
        console.log(err)
    })
})


module.exports = router