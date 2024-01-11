const express = require("express");
const {
  getCitasDisponiblesController,
  reservarCitaController,
  agregarCitaController,
  getCitasReservadasController,
  editarCitaController,
  eliminarCitaController,
} = require("../controllers/citaCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/citas-disponibles", getCitasDisponiblesController);
router.post("/reservar-cita/:citaId", authMiddleware, reservarCitaController);
router.post("/agregar-cita", authMiddleware, agregarCitaController);
router.put("/editar-cita/:citaId", authMiddleware, editarCitaController);

router.delete("/eliminar-cita/:citaId", authMiddleware, eliminarCitaController);

router.post("/getcitaReservada", authMiddleware, getCitasReservadasController);

module.exports = router;
