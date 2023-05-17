var express = require('express');
var router = express.Router();

const Post = require('../models/Post')

router.get('/', (req, res, next) => {

    Post.find()
        .sort({createdAt: -1})
        .then((foundPosts) => {
            res.json(foundPosts)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/detail/:id', (req, res, next) => {

    Post.findById(req.params.id)
        .populate('country')
        .populate('author')
        .populate({
            path: 'comments', 
            populate: {path: 'author'}
        })
        .populate('likes')
        .then((foundPost) => {
            res.json(foundPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/create', (req, res, next) => {

    Post.create(req.body)
        .then((createdPost) => {
            res.json(createdPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.post('/update/:id', (req, res, next) => {

    Post.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true
        })
        .then((updatedPost) => {
            res.json(updatedPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/delete/:id', (req, res, next) => {

    Post.findByIdAndDelete(req.params.id)
        .then((deletedResult) => {
            res.json(deletedResult)
        })
        .catch((err) => {
            console.log(err)
        })

})

module.exports = router;
