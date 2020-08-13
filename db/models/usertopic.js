'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTopic.belongsTo(models.User, {foreignKey: 'userId'});
      UserTopic.belongsTo(models.Topic, {foreignKey: 'topicId'});
    }
  };
  UserTopic.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserTopic',
  });
  return UserTopic;
};
