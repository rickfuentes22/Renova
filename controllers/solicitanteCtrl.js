const solicitanteModel = require("../models/solicitanteModel");
const funcionarioModel = require("../models/funcionarioModel");
const instructorModel = require("../models/instructorModel");
const medicoModel = require("../models/medicoModel");
const userModel = require("../models/userModels");
const Sequelize = require("sequelize");

const getSolicitanteInfoController = async (req, res) => {
  try {
    const userId = req.body.userId;
    const solicitante = await solicitanteModel.findOne({
      where: {
        userId: userId,
      },
    });
    res.status(200).send({
      success: true,
      message: "solicitante data fetch success",
      data: solicitante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Solicitante Details",
    });
  }
};

// update profile
const updateProfileController = async (req, res) => {
  try {
    const solicitante = await solicitanteModel.findOrCreate(
      { userId: req.body.userId },
      req.body
    );
    res.status(201).send({
      success: true,
      message: "Solicitante Profile Updated",
      data: solicitante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Solicitante Profile Update issue",
      error,
    });
  }
};

//get single solicitante
const getSolicitanteByIdController = async (req, res) => {
  try {
    const solicitanteId = req.body.solicitanteId;
    const solicitante = await solicitanteModel.findOne({
      where: {
        id: solicitanteId,
      },
    });
    res.status(200).send({
      success: true,
      message: "Single solicitante Info Fetched",
      data: solicitante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Erro in Single solicitante info",
    });
  }
};

const getDatosUsuarioController = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findOne({
      where: { id: userId },
      attributes: ["name", "email"],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.status(200).send({
      success: true,
      message: "Datos de usuario obtenidos",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener los datos del usuario",
    });
  }
};

const getAllFuncionarioController = async (req, res) => {
  try {
    const funcionarios = await funcionarioModel.findAll();

    res.status(200).send({
      success: true,
      message: "Datos de funcionarios obtenidos correctamente",
      data: funcionarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar datos de funcionarios",
      error: error.message,
    });
  }
};

const getAllMedicoController = async (req, res) => {
  try {
    const medicos = await medicoModel.findAll();

    res.status(200).send({
      success: true,
      message: "Datos de funcionarios obtenidos correctamente",
      data: medicos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar datos de funcionarios",
      error: error.message,
    });
  }
};

const getAllInstructorController = async (req, res) => {
  try {
    const instructores = await instructorModel.findAll();

    res.status(200).send({
      success: true,
      message: "Datos de funcionarios obtenidos correctamente",
      data: instructores,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar datos de funcionarios",
      error: error.message,
    });
  }
};

module.exports = {
  getSolicitanteInfoController,
  updateProfileController,
  getSolicitanteByIdController,
  getDatosUsuarioController,
  getAllFuncionarioController,
  getAllMedicoController,
  getAllInstructorController,
};
