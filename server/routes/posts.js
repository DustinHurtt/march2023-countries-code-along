var express = require('express');
var router = express.Router();

const isAuthenticated = require('../middleware/isAuthenticated')

const Post = require('../models/Post')

const Comment = require('../models/Comment')

router.get('/', (req, res, next) => {

    Post.find()
      .populate("country author")
      .populate({
        path: "comments",
        populate: { path: "author" },
      })
      .sort({ createdAt: -1 })
      .then((foundPosts) => {
        res.json(foundPosts);
      })
      .catch((err) => {
        console.log(err);
      });

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

router.post('/create', isAuthenticated, (req, res, next) => {

    const { title, story, image, country } = req.body;

    Post.create({
      title,
      story,
      image,
      country,
      author: req.user._id,
    })
      .then((createdPost) => {
        return createdPost
      })
      .then((toPopulate) => {
        return toPopulate.populate("country author")
    })
      .then((populated) => {
        res.json(populated)
      })
      .catch((err) => {
        console.log(err);
      });

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

router.post('/one-time/add-comment', (req, res, next) => {
    Comment.create({
        comment: "hkjgkjhkjhkjh",
        author: "e02cd0599c3fe34162cd7ed7"
    })
    .then((results) => {
        console.log("one time", results.data)
        res.json(results.data)
    })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;
