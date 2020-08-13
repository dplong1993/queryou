'use strict';

const bcrypt = require("bcryptjs/dist/bcrypt");


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {username: 'DemoUser', firstName: "Demo", lastName: "User", email: 'demo@user.io', hashedPassword: await bcrypt.hash('password', 10), description: 'DEMO DESCRIPTION'},
      {username: 'DemoUser1', firstName: "Demo1", lastName: "User1", email: 'demo1@user.io', hashedPassword: await bcrypt.hash('password1', 10), description: 'DEMO DESCRIPTION 1'},
      {} ], { fields: ['username', 'firstName', 'lastName', 'email', 'hashedPassword'] });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};