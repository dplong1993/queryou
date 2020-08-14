'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.hasMany(models.AnswerComment, {foreignKey: 'answerId'});
      Answer.belongsTo(models.User, {foreignKey: "ownerId"});
      Answer.belongsTo(models.Question, {foreignKey: "questionId"});
    }
  };
  Answer.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Content of answer must be between 1 and 5000 characters in length."
        }
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
