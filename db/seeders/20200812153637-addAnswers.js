'use strict';

const db = require('../models')
const { User, Question } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser1 = await User.findOne({
      where: { username: "DemoUser1" }
    }),
    const demoQuestion = await Question.findOne({
      where: { id: "1"}
    })
      await queryInterface.bulkInsert('Answers', [
        { content: 'This is a test answer for the demo question.', questionId: demoQuestion.id, ownerId: demoUser1.id }
        ], { fields: ['content']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};

