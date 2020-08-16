'use strict';

const db = require("../models");
const {Question, Topic} = db;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const questions = await Question.findAll();
    const topics = await Topic.findAll();
    await queryInterface.bulkInsert('QuestionTopics', [
      {questionId: questions[0].id, topicId: topics[0].id},
      {questionId: questions[1].id, topicId: topics[0].id},
      {questionId: questions[1].id, topicId: topics[1].id},
      {questionId: questions[2].id, topicId: topics[2].id},
      {questionId: questions[3].id, topicId: topics[1].id},
    ], { fields: ['questionId', 'topicId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QuestionTopics', null, {});
  }
};
