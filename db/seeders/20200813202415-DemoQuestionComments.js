'use strict';

const db = require('../models');
const {User, Question} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({where: {id: 1}});
    const question = await Question.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('QuestionComments', [
      {content: 'It might be.', ownerId: user.id, questionId: question.id},
      {content: 'Better Google it to be sure!', ownerId: user.id, questionId: question.id},
    ], { fields: ['content', 'ownerId', 'questionId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('QuestionComments', null, {});
  }
};
