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
      Answer.hasMany(model.AnswerComment, { foreignKey: 'answerId'}),
      Answer.belongsTo(model.Question, {foreignKey: 'questionId'}),
      Answer.belongsTo(model.User, { foreignKey: 'ownerId' })
    }
  };
  Answer.init({
    content: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};