const db = require('../database/models');
const Characters = db.Character;

const personajesController = {

    'list': async (req,res) =>{
        try{
            let characters = await Characters.findAll({
                attributes:["name","image"]
            })
            let response ={
                meta: {
                    satus:200,
                    total: characters.length,
                    url: '/characters'
                },
                data: characters
            }
            res.json(response);
        }catch(error){
            console.log(error);
        }
    },

    'detail': async (req,res)=>{
        try{
            let character = await Characters.findByPk(req.params.id,{
                include:[{
                    model: db.Film,
                    as:"films",
                    attributes: ["title"],
                    through: {attributes: []}
                }]
            })
            let response ={
                    meta: {
                        satus:200,
                        url: '/characters/:id'
                    },
                    data:character
                }
                res.json(response);    
        }catch(error){
            console.log(error);
        }
    },

    create: async (req, res) =>{
        try{
            let newCharacter = await Characters.create({
                ...req.body
            })
            let response ={
                    meta: {
                        status: 200,
                        url: '/characters/create'
                    },
                    data:newCharacter
                }
                res.json(response);
        }catch{(error)
            console.log(error);
        }
    }

}

module.exports= personajesController;