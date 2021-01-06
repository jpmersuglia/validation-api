const router = require('express').Router();
const Blocker = require('../model/Blocker.js');
const {blockerValidation} = require('../validation')

//Get All Blockers
router.get('/', async(req,res) => {
    try{
        const blocker = await Blocker.find();
        res.status(200)
        .json({
            msgError: false,
            data: blocker
        });
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: err
        })
    }
});

//Create new Blocker
router.post('/', async(req,res) => {
    const blocker = new Blocker({
        title: req.body.title,
        completed: req.body.completed,
        creator: req.body.creator
    });
    const {error} = blockerValidation(req.body);
    if(error) return res.status(502)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })
    try{
        const savedBlocker = await blocker.save();
        res.status(200)
        .json({
            msgError: false,
            data: savedBlocker
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgError: err
        })
    }
});

//Edit Specific Blocker
router.patch('/:id', async(req,res) => {
    const {error} = blockerValidation(req.body);
    if(error) return res.status(500)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })
    try{
        const updateBlocker = await Blocker.updateOne({_id: req.params.id},
            { 
                $set: {
                    title: req.body.title,
                    completed: req.body.completed
                }
            }
        )
        res.status(202)
        .json({
            msgError: false,
            data: {
                title: req.body.title,
                completed: req.body.completed
            }
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'We can not change the status of the blocker with such ID'
        })
    }
});

//Delete Specific Blocker
router.delete('/:id', async(req, res) =>{
    const deleteBlocker = await Blocker.deleteOne({_id: req.params.id});
    res.status(202)
    .json({
        msgError: false,
        msgBody: {
            msgBody: 'We have deleted a Blocker from the list',
            ID: req.params.id
        }
    })
});

module.exports = router; 