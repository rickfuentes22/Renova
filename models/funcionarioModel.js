const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const funcionarioModel = sequelize.define(
  "funcionarios",
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
    p_correctas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    p_incorrectas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clase: {
      type: DataTypes.STRING(50),
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: "funcionario", // Nombre de la tabla en la base de datos
    timestamps: false, // Si la tabla tiene campos de createdAt y updatedAt
  }
);

module.exports = funcionarioModel;
