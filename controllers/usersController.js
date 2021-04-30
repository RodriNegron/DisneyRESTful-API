const db = require("../database/models");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");
const fs = require('fs');
const User = db.User;
const key = fs.readFileSync('./keys/private.pem');
const {validationResult} = require('express-validator'); 

const usersController = {

    register: async function (req,res) {
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(422).json({errors: errors.array()})
            }
            let createdUser = await User.findOne({       
                where: { 
                    email: req.body.email
                }
            });
            if(createdUser){      
                return res.status(401).json({error: 'User already exists!'})                       
            }
            let user = await User.create({                                               
                ...req.body,                           
               password: bcryptjs.hashSync(req.body.password, 10)       
            });
            const token = jwt.sign(user.toJSON(), key)
            return res.send({user,token})

        }catch(error){

            console.error(error)
        }
    },

    login: async function (req, res) {
        const user = await User.findOne({where: {email: req.body.email}});
        let passwordCheck = user == null ? false : bcryptjs.compareSync(req.body.password, user.password);
        if(!(user && passwordCheck)){
            return res.status(401).json({
                error: 'Invalid user or password'
            })
        }
        const token = jwt.sign(user.toJSON(), key);
        res.send({user, token})
    }

}

module.exports=usersController;