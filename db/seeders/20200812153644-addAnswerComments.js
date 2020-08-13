'use strict';
const db = require('../models')
const { User, Answer } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser = await User.findOne({
      where: { username: "DemoUser"}
    }),
    const demoAnswer = await Answer.findOne({
      where: { id: '1'}
    })
    await queryInterface.bulkInsert('AnswerComments', [{
      content: 'This is a demo comment to the answer.', answerId: demoAnswer.id, ownerId: demoUser.id
    }], { fields: ['content']});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('AnswerComments', null, {});
  }
};
