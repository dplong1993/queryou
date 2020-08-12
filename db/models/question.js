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
        Question.hasMany(model.Answer, { foreignKey: 'questionId' }),
        Question.belongsTo(model.User, { foreignKey: 'ownerId' })

    }
  };
  Question.init({
    content: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Answer must be between 1 and 5000 characters."
        }
      },
      allowNull: false
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