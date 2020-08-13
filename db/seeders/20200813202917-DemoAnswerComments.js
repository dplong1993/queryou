'use strict';

const db = require('../models');
const {User, Answer} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const answers = await Answer.findAll();
    await queryInterface.bulkInsert('AnswerComments', [
      {content: 'Great Answer!', ownerId: users[0].id, answerId: answers[0].id},
      {content: 'You are so smart!', ownerId: users[2].id, answerId: answers[2].id},
    ], { fields: ['content', 'ownerId', 'answerId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AnswerComments', null, {});
  }
};
