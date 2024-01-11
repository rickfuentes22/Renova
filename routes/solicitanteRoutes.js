const express = require("express");
const {
  getSolicitanteInfoController,
  updateProfileController,
  getSolicitanteByIdController,
  getDatosUsuarioController,
  getAllFuncionarioController,
  getAllMedicoController,
  getAllInstructorController,
} = require("../controllers/solicitanteCtrl");

const {
  reservarCitaController,
  getCitasReservadasController,
} = require("../controllers/citaCtrl"); // Importa los controladores de citas desde citaCtrl.js
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//POST SINGLE DOC INFO
router.post(
  "/getSolicitanteInfo",
  authMiddleware,
  getSolicitanteInfoController
);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddleware, updateProfileController);

//POST  GET SINGLE DOC INFO
router.post(
  "/getSolicitanteById",
  authMiddleware,
  getSolicitanteByIdController
);

router.get(
  "/api/v1/user/getdatosusuario/:id",
  authMiddleware,
  getDatosUsuarioController
);
router.post("/reservar-cita/:citaId", authMiddleware, reservarCitaController);
router.post("/getcitaReservada", authMiddleware, getCitasReservadasController);
router.get("/funcionario", authMiddleware, getAllFuncionarioController);
router.get("/medico", authMiddleware, getAllMedicoController);
router.get("/instructor", authMiddleware, getAllInstructorController);

module.exports = router;
