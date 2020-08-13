'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static associate(models) {
      User.hasMany(models.Question, { foreignKey: 'ownerId' });
      User.hasMany(models.QuestionComment, { foreignKey: 'ownerId' });
      User.hasMany(models.AnswerComment, { foreignKey: 'ownerId' });
      User.hasMany(models.Topic, {foreignKey: 'ownerId'});
      User.hasMany(models.UserTopic, {foreignKey: 'userId'})
      User.belongsToMany(models.Topic, {
        through: models.UserTopic,
        foreignKey: 'userId',
        otherKey: 'topicId'
      });
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
