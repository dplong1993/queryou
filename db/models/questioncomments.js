'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionComments.belongsTo(model.Question, { foreignKey: 'questionId' }),
      QuestionComments.belongsTo(model.User, { foreignKey: 'ownerId' })
    }
  };
  QuestionComments.init({
    content: DataTypes.STRING,
    questionId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionComments',
  });
  return QuestionComments;
};