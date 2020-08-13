'use strict';

const db = require('../models');
const {User} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser = await User.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('Questions', [
      {content: 'Is this a question?', ownerId: demoUser.id},
    ], { fields: ['content', 'ownerId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
