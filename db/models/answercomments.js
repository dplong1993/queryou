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
    modelName: 'AnswerComments',
  });
  return AnswerComments;
};