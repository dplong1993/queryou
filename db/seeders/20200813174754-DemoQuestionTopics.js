'use strict';

const db = require("../models");
const {Question, Topic} = db;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const question = await Question.findOne({where: {id: 1}});
    const topic = await Topic.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('QuestionTopics', [
      {questionId: question.id, topicId: topic.id},
    ], { fields: ['questionId', 'topicId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QuestionTopics', null, {});
  }
};
