'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QuestionTopic.belongsTo(models.Question, {foreignKey: 'questionId'});
      QuestionTopic.belongsTo(models.Topic, {foreignKey: 'topicId'});
    }
  };
  QuestionTopic.init({
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'QuestionTopic',
  });
  return QuestionTopic;
};
