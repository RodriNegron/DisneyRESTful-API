const db = require('../database/models');
const Films = db.Film;

const filmsController = {

    'list':  async (req,res)=>{
        try{
            let films = await Films.findAll({
                attributes:["title","image","release_date"]
            });
            let response ={
                meta: {
                    satus:200,
                    total: films.length,
                    url: '/films'
                },
                data: films
            }
            res.json(response);
        }catch(error){
            console.log(error);
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
                    url: '/films/:id'
                },
                data:film
            }
            res.json(response)
        }catch(error){
            console.log(error)
        }
    }




}

module.exports=filmsController;