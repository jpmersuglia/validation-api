const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/Post.js');
const {postValidation} = require('../validation')
const User = require('../model/User');


//Date Formater
var dateFormat = require('dateformat');
var now = new Date();
const currentDate = dateFormat(now, "dddd, mmmm dS of yyyy. h:MM:ss TT");

//Get Posts Method
router.get('/', verify, async(req, res) =>{
    try{
        const posts = await Post.find();
        res.status(200)
        .json({
                msgError: false,
                data: posts
        });
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: err
        })
        //console.log('There was an error trying to access a wrong ID post!');
    }
});

//Post Method to add an Entry
router.post('/', verify, async(req, res) =>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try{
        const savedPost = await post.save();
        res.status(200)
        .json({
            msgError: false,
            data: savedPost
        });
        console.log({
            'New post created': savedPost.id,
            'Name': savedPost.title,
            'CreatedAt': currentDate
        });
    }catch(err){
        const {error} = postValidation(req.body);
        res.status(500)
        .json({
            msgError: true,
            msgBody: error.details[0].message
        })
    }
});

//Get Specific post
router.get('/:id', async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200)
        .json({
            msgError: false,
            data: post
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'There\'s no such post with that ID'
        })
    }
});

//Delete single post
router.delete('/:id', async(req,res) => {
    try{
        const deletePost = await Post.deleteOne({_id: req.params.id });
        console.log(deletePost)
        res.status(202)
        .json({
            msgError: false,
            data: deletePost
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'we can not delete the post with such ID'
        })
    }
});

//Update a post
router.patch('/:id', async(req,res) => {
    try{
        const updatePost = await Post.updateOne({ _id: req.params.id },
        console.log(updatePost),
            { $set: 
                {
                    title: req.body.title,
                    description: req.body.description
                }
            }
        )
        res.status(202)
        .json({
            msgError: false,
            data: { 
                title: req.body.title,
                description: req.body.description,
                updated: updatePost.ok
            }
        })
    }catch(err){
        const {error} = postValidation(req.body);
        res.status(500)
        .json({
            msgError: true,
            msgBody: error
        })
    }
});

module.exports = router;