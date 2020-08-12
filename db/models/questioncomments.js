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
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Answer must be between 1 and 5000 characters."
        }
      }
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
      },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'QuestionComments',
  });
  return QuestionComments;
};