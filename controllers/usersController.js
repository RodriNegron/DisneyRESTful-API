const db = require("../database/models");
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");
const fs = require('fs');
const User = db.User;
const key = fs.readFileSync('./keys/private.pem');

const usersController = {

    register: async function (req,res) {
        try{
            let createdUser = await User.findOne({       
                where: { 
                    email: req.body.email
                }
            });
            if(createdUser){      
                return res.send({error: 'User already exists!'})                       
            }
            let user = await User.create({                                               
                ...req.body,                           
               password: bcryptjs.hashSync(req.body.password, 10)       
            });
            const token = jwt.sign(user.toJSON(), key)
            return res.send({user,token})

        }catch(error){

            console.log(error)
        }
    },

    login: async function (req, res) {
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user) {
            return res.send({error: 'User not registered'})
        }
        let passwordCheck = bcryptjs.compareSync(req.body.password, user.password);
        if(passwordCheck){
            const token = jwt.sign(user.toJSON(), key);
            return res.send({user, token})
        }
        return res.send({error: 'Wrong password/user'})
    }

}

module.exports=usersController;