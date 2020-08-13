'use strict';

const db = require('../models');
const {User} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    await queryInterface.bulkInsert('Topics', [
      {description: 'This is a topic about nothing.', ownerId: users[0].id, name: "Nothing"},
      {description: 'This is a topic about existential thoughts and ideas.', ownerId: users[1].id, name: "Existential"},
      {description: 'This is a topic about CSS.', ownerId: users[2].id, name: "CSS"},
    ], { fields: ['description', 'ownerId', 'name']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Topics', null, {});
  }
};
