'use strict';

const db = require('../models')
const { User, Question } = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUser1 = await User.findOne({
      where: { username: "DemoUser1"}
    }),
    const demoQuestion = await Question.findOne({
      where: { id: "1"}
    })
    await queryInterface.bulkInsert('QuestionComments', [
      {
      name: 'John Doe',
      isBetaMember: false
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
