const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const userModel = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  isSolicitante: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  notification: {
    type: DataTypes.JSON,
    defaultValue: [],
  },

  seennotification: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});

module.exports = userModel;
