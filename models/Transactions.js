'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Associate Transaction with User (belongsTo)
      Transaction.belongsTo(models.User, {
        foreignKey: 'user_id',
      });

      // Associate Transaction with Package (belongsTo)
      Transaction.belongsTo(models.Package, {
        foreignKey: 'package_id',
      });
    }
  }

  Transaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionDetail: {
        type: DataTypes.TEXT, // or DataTypes.JSON
        allowNull: true, // Adjust the allowNull option based on your requirements
      },
      transactionHash: {
        type: DataTypes.STRING,
        allowNull: true, // or false if it shouldn't be nullable
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
    }
  );
  
  

  return Transaction;
};
