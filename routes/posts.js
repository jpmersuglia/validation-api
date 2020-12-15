const router = require('express').Router();
const verify = require('./verifyToken');
const Post = require('../model/Post.js');
const {postValidation} = require('../validation')
const User = require('../model/User');


//Date Formater
var dateFormat = require('dateformat');
var now = new Date();
const currentDate = dateFormat(now, "dddd, mmmm dS, yyyy. h:MM:ss TT");

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
    const {error} = postValidation(req.body);
    if(error) return res.status(502)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })
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
        res.status(500)
        .json({
            msgError: true,
            msgBody: err
        })
    }
});

//Get Specific post
router.get('/:id', verify, async(req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200)
        .json({
            msgError: false,
            data: post
        })
    }catch(err){
        const {error} = registerValidation(req.body);
        if (error) return res.status(500)
        .json({
            msgError: true,
            msgBody: 'There\'s no such post with that ID'
        })
    }
});

//Delete single post
router.delete('/:id', verify, async(req,res) => {
    try{
        const deletePost = await Post.deleteOne({_id: req.params.id });
        console.log({'A post has been deleted': {
            'ID': req.params.id,
            'Post deleted': deletePost
        }})
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
router.patch('/:id', verify, async(req,res) => {
    const {error} = postValidation(req.body);
    if(error) return res.status(500)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })

    try{
        const updatePost = await Post.updateOne({ _id: req.params.id },
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
            updated: updatePost.ok,
            data: { 
                title: req.body.title,
                description: req.body.description,
            }
            
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: error.details[0].message
        })
    }
});

module.exports = router;