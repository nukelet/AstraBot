'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Warning.init({
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    reason: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Warning',
  });
  return Warning;
};
