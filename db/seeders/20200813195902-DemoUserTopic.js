'use strict';

const db = require("../models");
const {User, Topic} = db;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const topics = await Topic.findAll();
    await queryInterface.bulkInsert('UserTopics', [
      {userId: users[0].id, topicId: topics[0].id},
      {userId: users[0].id, topicId: topics[1].id},
      {userId: users[0].id, topicId: topics[2].id},
      {userId: users[1].id, topicId: topics[0].id},
      {userId: users[1].id, topicId: topics[1].id},
      {userId: users[2].id, topicId: topics[1].id},
      {userId: users[2].id, topicId: topics[2].id},
    ], { fields: ['userId', 'topicId']});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('UserTopics', null, {});
  }
};
