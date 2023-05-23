
'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
      
		}
    static getUserWithRole(){
			console.log("user with log called")
		}
		
	}
	User.init({
    fullName: DataTypes.STRING,
   
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: 'unique_email',
        msg: 'Email address must be unique.'
      }
    }
    
,    
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
      allowNull: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetTokenExpiry: {
      type: DataTypes.DATE,
      allowNull:true
    }
	}, {
		sequelize,
		modelName: 'User',
	});
	return User;
};