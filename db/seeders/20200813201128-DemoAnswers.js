'use strict';

const db = require('../models');
const {User, Question} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({where: {id: 1}});
    const question = await User.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('Answers', [
      {content: 'I mean I guess it is.', ownerId: user.id, questionId: question.id},
    ], { fields: ['content', 'ownerId', 'questionId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
