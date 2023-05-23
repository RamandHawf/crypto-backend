'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pool extends Model {
    static associate(models) {
      // Associate Pool with User (belongsTo)
      Pool.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }

  Pool.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pool_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Pool',
    }
  );

  return Pool;
};
