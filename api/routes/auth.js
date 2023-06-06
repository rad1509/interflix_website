const router = require ("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    
    try{
        const user = await newUser.save();
        res.status(201).json(user);
    }catch(err){
        res.status(500).json(err);
    }
    
});

router.post("login", async (req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        const userPass = User.password;
        !user && res.status(401).json("Wrong password or username!");

        

        userPass !== req.body.password && res.status(401).json("Wrong password or username!");

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, "amrit",{ expiresI: "5d" });

        const { password, ...info } = user._doc;

        res.status(200).json({ ...info, accessToken });
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
