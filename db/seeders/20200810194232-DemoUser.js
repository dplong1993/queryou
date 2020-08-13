'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {username: 'DemoUser', firstName: "Demo", lastName: "User", email: 'demo@user.io', hashedPassword: await bcrypt.hash('password', 10), description: 'DEMO DESCRIPTION'},
      {username: 'DemoUser1', firstName: "Demo1", lastName: "User", email: 'demo1@user.io', hashedPassword: await bcrypt.hash('password', 10), description: 'DEMO DESCRIPTION'},
      {username: 'DemoUser2', firstName: "Demo2", lastName: "User", email: 'demo2@user.io', hashedPassword: await bcrypt.hash('password', 10), description: 'DEMO DESCRIPTION'}
    ], { fields: ['username', 'firstName', 'lastName', 'email', 'hashedPassword']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
