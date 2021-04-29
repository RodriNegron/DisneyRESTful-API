const fs = require('fs');
const jwt = require('jsonwebtoken');
const key = fs.readFileSync('./keys/public.pem') 

module.exports = (req, res, next) => {
    try{
        const {authorization} =req.headers
        const user = jwt.verify(authorization,key);
        req.user=user;
        next();
    }catch(error){
        console.error(error);
        res.status(401).json({message:"Unauthorized"})
    }

}