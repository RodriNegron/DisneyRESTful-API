'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {

    static associate(models) {
      Film.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genre_id"
    })
      
    Film.belongsToMany(models.Character, {
        as: "characters",
        through: 'Character_film',
        foreignKey: 'film_id',
        otherKey: 'character_id',
        onDelete: 'cascade'
    })
    }
  };
  Film.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    rating: DataTypes.FLOAT,
    genre_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Film',
  });
  return Film;
};