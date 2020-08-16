'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question.belongsTo(models.User, {foreignKey: 'ownerId'});
      Question.hasMany(models.QuestionTopic, {foreignKey: 'questionId'});
      Question.hasMany(models.QuestionComment, {foreignKey: 'questionId'});
      Question.hasMany(models.Answer, {foreignKey: 'questionId'});
      Question.belongsToMany(models.Topic, {
        through: models.QuestionTopic,
        foreignKey: 'questionId',
        otherKey: 'topicId'
      });
    }
  };
  Question.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Content of question must be between 1 and 5000 characters."
        }
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
