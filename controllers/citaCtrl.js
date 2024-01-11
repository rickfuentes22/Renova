const citaModel = require("../models/citaModel");
const Sequelize = require("sequelize");
const moment = require("moment");

const getCitasDisponiblesController = async (req, res) => {
  try {
    const citasDisponibles = await citaModel.findAll({
      where: { disponible: true },
    });

    res.status(200).json({
      success: true,
      data: citasDisponibles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al obtener citas disponibles",
      error: error.message,
    });
  }
};

const reservarCitaController = async (req, res) => {
  const { citaId } = req.params;
  const userId = req.body.userId;

  try {
    const cita = await citaModel.findOne({
      where: { id: citaId, disponible: true },
    });

    if (!cita) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada o no disponible",
      });
    }

    await citaModel.update(
      { disponible: false, userId: userId },
      { where: { id: citaId } }
    );

    res.status(200).json({
      success: true,
      message: "Cita reservada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al reservar la cita",
      error: error.message,
    });
  }
};

const agregarCitaController = async (req, res) => {
  try {
    const { fecha, hora } = req.body;

    const nuevaCita = await citaModel.create({
      fecha,
      hora,
    });

    return res.status(201).json({
      success: true,
      message: "Cita agregada exitosamente",
      data: nuevaCita,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al agregar la cita",
      error: error.message,
    });
  }
};

const editarCitaController = async (req, res) => {
  try {
    const { fecha, hora } = req.body;
    const citaId = req.params.citaId;

    const citaExistente = await citaModel.findOne({ where: { id: citaId } });

    if (!citaExistente) {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada o no autorizada para editar",
      });
    }

    const result = await citaModel.update(
      { fecha, hora },
      { where: { id: citaId } }
    );

    if (result === 1) {
      return res.json({
        success: true,
        message: "Cita actualizada exitosamente",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error al actualizar la cita",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al editar la cita",
      error: error.message,
    });
  }
};

const eliminarCitaController = async (req, res) => {
  try {
    const result = await citaModel.destroy({
      where: { id: req.params.citaId },
    });

    if (result === 1) {
      return res.json({
        success: true,
        message: "Cita eliminada exitosamente",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Cita no encontrada o no autorizada para eliminar",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error al eliminar la cita",
      error: error.message,
    });
  }
};

const getCitasReservadasController = async (req, res) => {
  try {
    const userId = req.body.userId;

    const citasReservadas = await citaModel.findAll({
      where: {
        userId: userId,
      },
      attributes: ["id", "fecha", "hora", "userId"],
    });

    if (citasReservadas.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No se encontraron citas reservadas para este usuario.",
      });
    }

    res.status(200).send({
      success: true,
      message: "Citas reservadas obtenidas",
      data: citasReservadas,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener las citas reservadas",
    });
  }
};

module.exports = {
  getCitasDisponiblesController,
  reservarCitaController,
  agregarCitaController,
  editarCitaController,
  eliminarCitaController,
  getCitasReservadasController,
};
