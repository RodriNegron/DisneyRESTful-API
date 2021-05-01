'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character_film extends Model {
    
    static associate(models) {
      Character_film.belongsTo(models.Film, {
        foreignKey:"film_id"
    })
    Character_film.belongsTo(models.Character, {
        foreignKey:"character_id"
    })
    }
  };
  Character_film.init({
    film_id: DataTypes.INTEGER,
    character_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Character_film',
  });
  return Character_film;
};