'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Package.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Package',
    }
  );

  return Package;
};
