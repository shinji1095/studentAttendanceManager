'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attendance.belongsTo(models.User, {
        sourceKey: "id",
        foreignKey: "userID"
      })
    }
  };
  Attendance.init({
    arrival: DataTypes.DATE,
    leave: DataTypes.DATE,
    roomID: DataTypes.STRING,
    riskForLunch: DataTypes.STRING,
    riskForDinner: DataTypes.STRING,
    userID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};