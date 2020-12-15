const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {

    // Data Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400)
        .json({
            msgBody: error.details[0].message,
            msgError: true
        });

    //Email is already in use
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400)
        .json({
            msgBody: "Email Already Exists",
            msgError: true
        });

    //Password Hashing
    //const salt = await bcrypt.gentSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(202).json(savedUser);
    }catch(err){
        res.status(400)
        .json({
            msgBody: message.err,
            msgError: true
        });
    }
});

//Login
router.post('/login', async(req,res) => {
    //Data Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400)
        .json({
            msgBody: error.details[0].message,
            msgError: true
        })

    //Check if Email exists, and We call the const as user
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400)
        .json({
            msgBody: `Email doesn't exist`,
            msgError: true
        });

    //Password Validation
    const validPass = await bcrypt.compare(req.body.password, user.password)

        if(!validPass) return res.status(400)
        .json({
            msgBody: 'Incorrect Password',
            msgError: true
        });
            //Creating and assign token
            const token = jwt.sign({_id: user._id}, process.env.JWTOKEN, {expiresIn: 60});
            res.setHeader('auth-token', token)
            .send(token)
            .json({
                msgError: false,
                msgBody: "You have succesfully logged in."
            });
    
});

module.exports = router;