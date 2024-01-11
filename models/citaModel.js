const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const citaModel = sequelize.define("citas", {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  disponible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  userId: {
    type: DataTypes.STRING,
  },
});

citaModel.sync();

module.exports = citaModel;
