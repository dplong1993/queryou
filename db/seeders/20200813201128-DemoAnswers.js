'use strict';

const db = require('../models');
const {User, Question} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const questions = await Question.findAll();
    await queryInterface.bulkInsert('Answers', [
      {content: 'I mean I guess it is.', ownerId: users[1].id, questionId: questions[0].id},
      {content: 'That is definitely a question.', ownerId: users[2].id, questionId: questions[0].id},
      {content: 'That\'s obvious! It\'s 42.', ownerId: users[0].id, questionId: questions[1].id},
      {content: 'Dread. Only dread.', ownerId: users[2].id, questionId: questions[1].id},
      {content: 'Oh its very quick... *laughs maniacally*', ownerId: users[0].id, questionId: questions[2].id},
      {content: 'I\'ve been working on the CSS for my page for over 2 years.', ownerId: users[1].id, questionId: questions[2].id},
    ], { fields: ['content', 'ownerId', 'questionId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
