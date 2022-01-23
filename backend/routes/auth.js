const router= require('express').Router();
const {validateUser}=require('../utils/index');
const bcrypt = require('bcryptjs');
//login
router.post('/login',async(req,res)=>{
    //validate data from request body 
    const valid = validateUser(req.body);
    if(!valid) return res.status(400).send(error);
    const user= await User.findOne({email:req.body.email}).then(async (user)=> {
        if(!user) return res.status(400).send({msg:"email not found"});
        const validpass= bcrypt.compare(req.body.password,user.password);

        if(!validpass) return res.status(400).send({msg:"oops"});

        const token= createToken({id:user.id,email:user.email});
        res.header("auth-token",token).send(token);

    });
});