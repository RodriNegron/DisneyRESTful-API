const { Op } = require('sequelize');
const db = require('../database/models');
const {getPagination, getPagingData} = require("../services/pagination");
const Characters = db.Character;

const personajesController = {

    'list': async (req,res) =>{
        try{
            const { baseUrl: endpoint } = req;
            const { page, size, name, age } = req.query;
            var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
            condition= age ? {age:age} : condition;
            const { limit, offset } = getPagination(page, size);
            
            data = await Characters.findAndCountAll({
                attributes:["name","image"],
                distinct:true,
                where: condition, 
                limit,
                offset
            })
            const response = getPagingData(data, page, limit, endpoint);
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
            if(!character) return res.status(404).json({error: 'Not found'});

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