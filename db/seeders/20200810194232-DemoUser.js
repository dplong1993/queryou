'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      username: 'DemoUser', firstName: "Demo", lastName: "User", email: 'demo@user.io', hashedPassword: await bcrypt.hash('password', 10), description: 'DEMO DESCRIPTION'
    }], { fields: ['username', 'firstName', 'lastName', 'email', 'hashedPassword']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};