'use strict';

const db = require("../models");
const {User, Topic} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.findOne({where: {id: 1}});
    const topic = await Topic.findOne({where: {id: 1}});
    await queryInterface.bulkInsert('UserTopics', [
      {userId: user.id, topicId: topic.id},
    ], { fields: ['userId', 'topicId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserTopics', null, {});
  }
};
