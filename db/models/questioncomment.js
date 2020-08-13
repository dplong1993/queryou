'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionComment.belongsTo(models.User, {foreignKey: "ownerId"});
      QuestionComment.belongsTo(models.Question, {foreignKey: "questionId"});
    }
  };
  QuestionComment.init({
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
    questionId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'QuestionComment',
  });
  return QuestionComment;
};
