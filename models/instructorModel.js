const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const instructorModel = sequelize.define(
  "instructores",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rut: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    f_graves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    f_leves: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "instructor",
    timestamps: false,
  }
);

module.exports = instructorModel;
