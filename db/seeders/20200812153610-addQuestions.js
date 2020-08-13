'use strict';
const db = require('../models')
const { User } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser = await User.findOne({
      where: { username: "DemoUser"}
    });
    await queryInterface.bulkInsert('Questions', [
      { content: 'This is a demo questions?', ownerId: demoUser.id },
      ], { fields: ['content', 'ownerId']});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Questions', null, {});
  }
};

