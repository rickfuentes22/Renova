const solicitanteModel = require("../models/solicitanteModel");
const userModel = require("../models/userModels");
const Sequelize = require("sequelize");
const path = require("path");
const fs = require("fs");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.findAll();

    res.status(200).send({
      success: true,
      message: "Lista de usuarios",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar usuarios",
      error: error.message,
    });
  }
};

const getAllSolicitantesController = async (req, res) => {
  try {
    const solicitantes = await solicitanteModel.findAll();

    const solicitantesConPDF = solicitantes.map((solicitante) => {
      const pdfFileName = solicitante.pdfPath;
      if (pdfFileName) {
        solicitante.pdfURL = `/api/pdfs/${pdfFileName}`;
      }
      return solicitante;
    });

    res.status(200).send({
      success: true,
      message: "Solicitantes lista",
      data: solicitantesConPDF,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar datos",
      error: error.message,
    });
  }
};

const changeAccountStatusController = async (req, res) => {
  try {
    const { solicitanteId, status } = req.body;

    const [affectedRows] = await solicitanteModel.update(
      { status },
      {
        where: { id: solicitanteId },
      }
    );

    if (affectedRows === 0) {
      return res.status(404).send({
        success: false,
        message: "Solicitante no encontrado",
      });
    }

    const solicitante = await solicitanteModel.findByPk(solicitanteId);

    const user = await userModel.findOne({
      where: { id: solicitante.userId },
    });

    const notification = user.notification || [];

    notification.push({
      type: "solicitante-account-request-updated",
      message: `Tu solicitud de tramite a sido ${status} `,
      onClickPath: "/notification",
    });

    userModel
      .update({ notification }, { where: { id: user.id } })
      .then(() => {
        console.log("Notificación actualizada con éxito.");
      })
      .catch((error) => {
        console.error("Error al actualizar la notificación:", error);
      });

    user.isSolicitante = status === "aprobado" ? true : false;
    await user.save();

    res.status(201).send({
      success: true,
      message: "Estado  actualizado",
      data: solicitante,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error de estado ",
      error: error.message,
    });
  }
};
const getDatosUsuarioController = async (req, res) => {
  try {
    const users = await userModel.findOne({ where: { id: userId } });
    res.status(200).send({
      success: true,
      message: "Lista de usuarios",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al buscar usuarios",
      error: error.message,
    });
  }
};

const getPdfController = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../uploads", fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error al enviar el archivo:", err);
      res.status(err.status).end();
    } else {
      console.log("Archivo enviado correctamente:", fileName);
    }
  });
};

module.exports = {
  getAllSolicitantesController,
  getAllUsersController,
  changeAccountStatusController,
  getDatosUsuarioController,
  getPdfController,
};
