const express = require("express");
const app = express();
const path = require("path");

const {
  getCitasDisponiblesController,
  reservarCitaController,
  agregarCitaController,
} = require("../controllers/citaCtrl");

const {
  getAllUsersController,
  getAllSolicitantesController,
  changeAccountStatusController,
  getDatosUsuarioController,
} = require("../controllers/adminCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// GET METHOD || USERS
router.get("/getAllUsers", authMiddleware, getAllUsersController);

// GET METHOD || Solicitantes
router.get("/getAllSolicitantes", authMiddleware, getAllSolicitantesController);

// POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

// GET user data by ID
router.get("/getdatosusuario/:id", authMiddleware, getDatosUsuarioController);

// GET PDF by filename
// Rutas relacionadas con citas
router.get("/citas-disponibles", authMiddleware, getCitasDisponiblesController);
router.post("/reservar-cita/:citaId", authMiddleware, reservarCitaController);
router.post("/agregar-cita", authMiddleware, agregarCitaController);

module.exports = router;
