const express = require("express");
const path = require("path");
const multer = require("multer");
const upload = require("../config/storage");
const {
  loginController,
  registerController,
  authController,
  applySolicitanteController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllSolicitantesController,
  getDatosUsuarioController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

// Multer Config

//Express import
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

router.post(
  "/apply-solicitante",
  authMiddleware,
  upload.fields([
    { name: "pdfFile", maxCount: 1 },
    { name: "certificadoFile", maxCount: 1 },
  ]),
  applySolicitanteController
);

//Notifiaction  Solicitante || POST
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllNotificationController
);
//Notifiaction  Solicitante || POST
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllNotificationController
);

//GET ALL SOLI
router.get("/getAllSolicitantes", authMiddleware, getAllSolicitantesController);

router.get("/getdatosusuario/:id", authMiddleware, getDatosUsuarioController);

router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = router;
