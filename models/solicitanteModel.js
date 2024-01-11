const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const solicitanteModel = sequelize.define(
  "solicitantes",
  {
    userId: {
      type: DataTypes.STRING,
    },
    tipoObtencion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipoclase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdfPath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pendiente",
    },
  },
  { timestamps: true }
);
module.exports = solicitanteModel;
