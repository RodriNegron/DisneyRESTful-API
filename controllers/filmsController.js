const db = require('../database/models');
const Films = db.Film;

const filmsController = {

    'list':  async (req,res)=>{
        try{
            let {page,size}=req.query;
            if(!page){page=1};
            if(!size){size=30};
            const limit = parseInt(size);
            const offset =(page-1)*size;
            let films = await Films.findAll({
                attributes:["title","image","release_date"],
                limit: limit,
                offset:offset 
            });
            let response ={
                meta: {
                    satus:200,
                    total: films.length,
                    url: 'api/films'
                },
                data: films
            }
            res.json(response);
        }catch(error){
            res.status(500).json(error);
        }
    },
    
    'detail': async (req,res)=>{
        try{
            let film = await Films.findByPk(req.params.id,{
                include:[{
                    model: db.Character,
                    as:"characters",
                    attributes: ["name"],
                    through: {attributes: []} 
                }]
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
            console.log(error)
        }
    },

    create: async (req, res) =>{
        try{
            let newFilm = await Films.create({
                ...req.body
            })
            let response ={
                    meta: {
                        status: 200,
                        url: 'api/films/create'
                    },
                    data:newFilm
                }
                res.json(response);
        }catch(error){
            console.log(error);
        }
    },

    update: async (req,res) =>{
        try{
            await Films.update(req.body,{
                where:{id:req.params.id}
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
            console.log(error);
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
			console.log(error);
        }
    }


}

module.exports=filmsController;