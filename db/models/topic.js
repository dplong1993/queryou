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
      Topic.belongsTo(model.User, { foreignKey: 'ownerId' })
    }
  };
  Topic.init({
    description: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};