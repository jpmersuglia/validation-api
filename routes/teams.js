const router = require('express').Router();
const Scrum = require('../model/Scrum.js');
const Team = require('../model/Team.js');
const {teamValidation} = require('../validation')

//Get Scrums
// router.get('/', async(req,res) =>{
//     try{
//         const scrum = await Scrum.find();
//         res.status(200)
//         .json({
//             msgError: false,
//             data: scrums
//         });
//     }catch(err){
//         res.status(500)
//         .json({
//             msgError: true,
//             msgBody: err
//         })
//     }
// });

//Get Team List
router.get('/', async(req,res) => {
    try{
        const team = await Team.find();
        res.status(200)
        .json({
            msgError: false,
            data: team
        });
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'There was an error tryng to get Teams'
        })
    }
});

//Create a Team
router.post('/', async(req,res) => {
    const team = new Team({
        name: req.body.name,
        owner: req.body.owner
    });
    const {error} = teamValidation(req.body);
    if(error) return res.status(502)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })
    try{
        const savedTeam = await team.save();
        res.status(200)
        .json({
            msgError: false,
            data: savedTeam
        });
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgError: err
        })
    }
});

//Get Specific Team
router.get('/:id', async(req,res) => {
    try{
        const team = await Team.findById(req.params.id);
        res.status(200)
        .json({
            msgError: false,
            data: team
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'There is not a Team with such ID'
        })
    }
});

//Edit Specific Team
router.patch('/:id', async(req,res) => {
    const {error} = teamValidation(req.body);
    if(error) return res.status(500)
    .json({
        msgError: true,
        msgBody: error.details[0].message
    })
    try{
        const updateTeam = await Team.updateOne({_id: req.params.id},
            { $set:
                {
                name: req.body.name
                }
            }
        )
        res.status(202)
        .json({
            msgError: false,
            updated: updateTeam.ok,
            data: {
                name: req.body.name
            }
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'We can not edit a Team with such ID'
        })
    }
})

//Delete Specific Team
router.delete('/:id', async(req,res) => {
    try{
        const deleteTeam = await Team.deleteOne({_id: req.params.id});
        res.status(202)
        .json({
            msgError: false,
            msgBody: {
                msgBody: 'We have deleted a Team from the List',
                ID: req.params.id
            }
        })
    }catch(err){
        res.status(500)
        .json({
            msgError: true,
            msgBody: 'There is not a Team with such ID'
        })
    }
});

module.exports = router;