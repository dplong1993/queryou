'use strict';

const db = require('../models');
const {User} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    await queryInterface.bulkInsert('Questions', [
      {content: 'Is this a question?', ownerId: users[0].id},
      {content: 'What is the meaning of life?', ownerId: users[1].id},
      {content: 'How long could CSS really take?', ownerId: users[2].id},
      {content: 'What is love?', ownerId: users[2].id}
    ], { fields: ['content', 'ownerId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
