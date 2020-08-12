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
        QuestionTopic.belongsTo(model.Question, { foreignKey: 'questionId' }),
        QuestionTopic.belongsTo(model.Topic, { foreignKey: 'topicId' })
    }
  };
  QuestionTopic.init({
    questionId: DataTypes.INTEGER,
    topicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'QuestionTopic',
  });
  return QuestionTopic;
};