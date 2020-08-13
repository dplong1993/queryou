'use strict';

const db = require('../models');
const {User, Question} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const questions = await Question.findAll();
    await queryInterface.bulkInsert('QuestionComments', [
      {content: 'It might be.', ownerId: users[1].id, questionId: questions[0].id},
      {content: 'Better Google it to be sure!', ownerId: users[2].id, questionId: questions[0].id},
      {content: 'I think this is an awesome question!', ownerId: users[0].id, questionId: questions[1].id},
      {content: 'This question is garbage go next!', ownerId: users[1].id, questionId: questions[2].id},
    ], { fields: ['content', 'ownerId', 'questionId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QuestionComments', null, {});
  }
};
