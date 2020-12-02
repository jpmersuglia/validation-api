const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) => {

    // Data Validation
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Email is already in use
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    //Password Hashing
    const salt = await bcrypt.gentSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.status(202).res.send(savedUser);
    }catch(err){
        res.status(400).json({message:err});
    }
});

//Login
router.post('/login', async(req,res) => {
    //Data Validation
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Email is already in use
    const emailExist = await User.findOne({email: req.body.email});
    if(!emailExist) return res.status(400).send(`Email doesn't exist`);

    //Password Validation
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid Password');

    //Creating and assign token
    const token = jwt.sign({_id: user._id}, process.env.JWTOKEN);
    res.header('auth-token', token).send(token);
    
});

module.exports = router;