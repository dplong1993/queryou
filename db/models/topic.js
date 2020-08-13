'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.hasMany(model.UserTopic, { foreignKey: 'topicId' }),
      Topic.belongsTo(model.User, { foreignKey: 'ownerId' }),
      Topic.hasMany(model.QuestionTopic, {foreignKey: 'topicId'})
    }
  };
  Topic.init({
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Topic description must be between 1 and 5000 characters."
        }
      }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};