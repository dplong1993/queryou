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
      // define association here
      Topic.belongsTo(models.User, {foreignKey: 'ownerId'});
      Topic.hasMany(models.QuestionTopic, {foreignKey: 'topicId'});
      Topic.hasMany(models.UserTopic, {foreignKey: 'topicId'});
      Topic.belongsToMany(models.Question, {
        through: models.QuestionTopic,
        foreignKey: 'topicId',
        otherKey: 'questionId'
      });
      Topic.belongsToMany(models.User, {
        through: models.UserTopic,
        foreignKey: 'topicId',
        otherKey: 'userId'
      });
    }
  };
  Topic.init({
    description: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [1, 5000],
          msg: "Topic description must be between 1 and 5000 characters."
        }
      }
    },
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: "Topic name must be between 1 and 100 characters."
        },
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};
