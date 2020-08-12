'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerComments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AnswerComments.belongsTo(model.Answer, { foreignKey: 'answerId' }),
      AnswerComments.belongsTo(model.User, { foreignKey: 'ownerId' })
    }
  };
  AnswerComments.init({
    content: DataTypes.STRING,
    answerId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AnswerComments',
  });
  return AnswerComments;
};