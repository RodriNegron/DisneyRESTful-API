'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
  
    static associate(models) {
      Genre.hasMany(models.Film, {
        as: "films",
        foreignKey: "genre_id"
    })
    }
  };
  Genre.init({
    name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Genre',
  });
  return Genre;
};