'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AnswerComment.belongsTo(models.User, {foreignKey: "ownerId"});
      AnswerComment.belongsTo(models.Answer, {foreignKey: "answerId"});
    }
  };
  AnswerComment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 1000],
          msg: "Content of commment must be between 1 and 1000 characters in length."
        }
      }
    },
    answerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'AnswerComment',
  });
  return AnswerComment;
};
