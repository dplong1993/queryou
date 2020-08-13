'use strict';

const db = require('../models');
const {User} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser = await User.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('Topics', [
      {description: 'This is a topic about nothing', ownerId: demoUser.id, name: "Nothing"},
    ], { fields: ['description', 'ownerId', 'name']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};
