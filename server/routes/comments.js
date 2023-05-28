var express = require('express');
var router = express.Router();

const Comment = require('../models/Comment')

const Post = require('../models/Post')

router.post('/new-comment/:userId/:postId', (req, res, next) => {
    Comment.create({
        comment: req.body.comment,
        author: req.params.userId
    })
    .then((createdComment) => {
        Post.findByIdAndUpdate(req.params.postId, {
            $push: {comments: createdComment._id}
        },
        {new: true})
        .populate('country author likes')
        .populate({
            path: 'comments', 
            populate: {path: 'author'}
        })
        .then((updatedPost) => {
            console.log(updatedPost)
            res.json(updatedPost)
        })
        .catch((err) => {
            console.log(err)
        })
    })
    // .then((toPopulate) => {
    //     toPopulate.populate('author')
    //         .then((populated) => {
    //             res.json(populated)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // })
    .catch((err) => {
        console.log(err)
    })
})

module.exports = router;