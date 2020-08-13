'use strict';

const db = require('../models');
const {User, Answer} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({where: {id: 1}});
    const answer = await Answer.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('AnswerComments', [
      {content: 'Great Answer!', ownerId: user.id, answerId: answer.id},
      {content: 'You are so smart!', ownerId: user.id, answerId: answer.id},
    ], { fields: ['content', 'ownerId', 'answerId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('AnswerComments', null, {});
  }
};
