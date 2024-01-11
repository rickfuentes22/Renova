const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const medicoModel = sequelize.define(
  "medicos",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    rut: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    examen_visual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    examen_auditivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    examen_psicologico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    coordinacion_motriz: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    examen_general: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    aprobado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "medico", // Nombre de la tabla en la base de datos
    timestamps: false, // Si la tabla tiene campos de createdAt y updatedAt
  }
);

module.exports = medicoModel;
