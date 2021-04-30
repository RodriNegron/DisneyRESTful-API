const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const signOptions = {expiresIn: "1h", algorithm: 'RS256'};
const key = fs.readFileSync('./keys/private.pem')
const createToken = (payload)=> jwt.sign(payload,key,signOptions);

const auth = async (req, res) =>{
    try{
        const user = await db.User.findOne({where: {email: req.body.email}});
        const passwordCheck = user == null ? false : bcryptjs.compareSync(req.body.password, user.password)
        if(!(user && passwordCheck)) return res.status(401).json({message: "Unauthorized"});
        const {id} = user;
        const token = createToken({id,user});
        res.json({JWT: token});

    }catch(error){
        console.error(error);
    }
}

router.post('/', auth);

module.exports=router;