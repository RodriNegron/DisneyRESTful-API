'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {

    static associate(models) {
      Character.belongsToMany(models.Film, { 
        as: "films",
        through: 'Character_film',
        foreignKey: 'character_id',
        otherKey: 'film_id',
        onDelete: 'cascade'
    })
    }
  };
  Character.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.FLOAT,
    history: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};