const db = require("../database/models");
const bcryptjs = require("bcryptjs");
const User = db.User;
const {validationResult} = require('express-validator'); 

const usersController = {

    register: async function (req,res) {
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            let createdUser = await User.findOne({       
                where: { 
                    email: req.body.email
                }
            });
            if(createdUser) return res.status(401).json({error: 'User already exists!'});                     
            let user = await User.create({                                               
                ...req.body,                           
               password: bcryptjs.hashSync(req.body.password, 10)       
            });
            res.json({
                Name:user.name,
                Email:user.email
            })

        }catch(error){
            res.status(500).json(error)
        }
    }
}

module.exports=usersController;