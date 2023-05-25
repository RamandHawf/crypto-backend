'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: 'user_id' });
      // Order.belongsTo(models.Pool, { foreignKey: 'pool_id' });
      Order.belongsTo(models.Package, { foreignKey: 'package_id' });
    }
  }

  Order.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // order_details: {
      //   type: DataTypes.STRING,
      // },
      pool_id: {
        type: DataTypes.STRING,
      },
      power_id: {
        type: DataTypes.STRING,
      },
      
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );

  return Order;
};
