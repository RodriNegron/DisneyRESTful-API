const { Op } = require('sequelize');
const db = require('../database/models');
const Characters = db.Character;

const personajesController = {

    'list': async (req,res) =>{
        try{
            let filter = {};
            let { q, age_ } = req.query
            if(q){
                filter.name={[Op.like]: `%${q}%`}
            }
            if(age_){
                filter.age=age_
            }
            let {page,size}=req.query;
            if(!page){page=1};
            if(!size){size=30};
            const limit = parseInt(size);
            const offset =(page-1)*size;
            let characters = await Characters.findAll({
                where:filter,
                attributes:["name","image"],
                limit: limit,
                offset:offset 
            })
            let response ={
                meta: {
                    satus:200,
                    total: characters.length,
                    url: 'api/characters',
                },
                page,
                data: characters
            }
            res.json(response);
        }catch(error){
            res.status(500).json(error)
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
                        url: 'api/characters/:id'
                    },
                    data:character
                }
                res.json(response);    
        }catch(error){
            res.status(500).json(error)
        }
    },

    create: async (req, res) =>{
        try{
            let newCharacter = await Characters.create({
                ...req.body
            })
            let response ={
                    meta: {
                        status: 201,
                        url: 'api/characters/create'
                    },
                    data:newCharacter
                }
                res.json(response);
        }catch(error){
            res.status(500).json(error)
        }
    },

    update: async (req,res) =>{
        try{
            await Characters.update(req.body,{
                where:{id:req.params.id}
            })
            let response={
                meta: {
                    status: 200,
                    url: 'api/characters/update'
                },
                data:`character ${req.params.id} updated successfully`
            }
            res.json(response);
        }catch(error){
            res.status(500).json(error)
        }
    },

    destroy: async (req,res) =>{
        try{
            await Characters.destroy({
				where:{
					id: req.params.id
				}
			});
            let response={
                meta: {
                    status: 200,
                    url: 'api/characters/delete'
                },
                data:`character ${req.params.id} deleted successfully`
            }
			res.json(response);
		}catch (error){
			res.status(500).json(error)
        }
    }

}

module.exports= personajesController;