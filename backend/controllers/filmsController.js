const { Op } = require('sequelize');
const db = require('../database/models');
const {validationResult} = require('express-validator'); 
const {getPagination, getPagingData} = require("../services/pagination");
const Films = db.Film;
const Genres = db.Genre;

const filmsController = {

    'list':  async (req,res)=>{
        try{
            const { page, size, title, genre} = req.query;
            var condition = title ? { title: { [Op.like]: `%${title}%` } } : {};
            if(genre){
                let genero = await Genres.findOne({
                    where:{name:{ [Op.like]: `%${genre}%` } }
                });
                if(!genero) res.status(404).json({error: 'Invalid genre name'})
                condition.genre_id=genero.id
            }
            
            const { limit, offset } = getPagination(page, size);
            
            data = await Films.findAndCountAll({
                attributes:["title","image","release_date"],
                distinct:true,
                where: condition, 
                limit,
                offset
            })
            const response = getPagingData(data, page, limit);
            res.json(response);   

        }catch(error){
            res.status(500).json(error);
        }
    },
    
    'detail': async (req,res)=>{
        try{
            let film = await Films.findByPk(req.params.id,{
                include:[{
                    model: db.Genre,
                    as:"genre",
                    attributes: ["name"] 
                },{
                    model: db.Character,
                    as:"characters",
                    attributes: ["name"],
                    through: {attributes: []}
                }],
                attributes: {
                    exclude: ["genre_id"]
                }
            })
            let response ={
                meta: {
                    satus:200,
                    url: 'api/films/:id'
                },
                data:film
            }
            res.json(response)
        }catch(error){
            res.status(500).json(error)
        }
    },

    create: async (req, res) =>{
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            let newFilm = await Films.create({
                ...req.body
            })
            let response ={
                    meta: {
                        status: 201,
                        url: 'api/films/create'
                    },
                    data:newFilm
                }
                res.json(response);
        }catch(error){
            res.status(500).json(error)
        }
    },

    update: async (req,res) =>{
        try{
            await Films.update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            let response={
                meta: {
                    status: 200,
                    url: 'api/films/update'
                },
                data:"film updated successfully"
            }
            res.json(response);
        }catch(error){
            res.status(500).json(error)
        }
    },

    destroy: async (req,res) =>{
        try{
            await Films.destroy({
				where:{
					id: req.params.id
				}
			});
            let response={
                meta: {
                    status: 200,
                    url: 'api/films/delete'
                },
                data:"film deleted successfully"
            }
			res.json(response);
		}catch (error){
			res.status(500).json(error)
        }
    }


}

module.exports=filmsController;