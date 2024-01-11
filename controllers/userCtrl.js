const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const solicitanteModel = require("../models/solicitanteModel");
const moment = require("moment");
//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exisitingUser) {
      return res.status(200).send({
        message: "Usuario ya existe en nuestra base de datos",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registro Exitoso", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { email: req.body.email } });

    if (!user) {
      return res
        .status(200)
        .send({ message: "User not found", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Correo o contraseña invalidos", success: false });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .send({ message: "Inicio de sesion exitoso", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error en login ${error.message}` });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findByPk(req.body.userId);
    if (!user) {
      return res.status(200).send({
        message: "Usuario no encontrado",
        success: false,
      });
    }

    // El usuario existe, ahora puedes acceder a sus propiedades
    user.password = undefined;

    res.status(200).send({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

const applySolicitanteController = async (req, res) => {
  try {
    const pdfFile = req.files["pdfFile"][0]; // Primer archivo subido con nombre 'pdfFile'
    const certificadoFile = req.files["certificadoFile"][0]; // Primer archivo subido con nombre 'certificadoFile'

    // Obtener los nombres de archivo y rutas
    const pdfPath = pdfFile ? pdfFile.filename : null;
    const certificadoPath = certificadoFile ? certificadoFile.filename : null;

    // Crear el nuevo solicitante con los datos de los archivos
    const newSolicitante = await solicitanteModel.create({
      ...req.body,
      status: "pendiente",
      pdfPath: pdfPath, // Atributo que almacena la información del archivo pdfFile
      certificado: certificadoPath, // Atributo que almacena la información del archivo certificadoFile
    });
    const adminUser = await userModel.findOne({ where: { isAdmin: true } });

    const notification = adminUser.notifcation || [];
    notification.push({
      type: "apply-solicitante-request",
      message: `${newSolicitante.firstName} ${newSolicitante.lastName} Ha solicitado un nuevo trámite`,
      data: {
        solicitanteId: newSolicitante.id,
        name: newSolicitante.firstName + " " + newSolicitante.lastName,
        onClickPath: "/admin/solicitantes",
      },
    });

    await adminUser.update({ notification }, { where: { isAdmin: true } });
    res.status(201).send({
      success: true,
      message: "Solicitud enviada con exito",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error Tramite Solicitante",
    });
  }
};

//notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: { id: req.body.userId },
    });

    const seennotification = user.seennotification || [];
    const notification = user.notification || [];

    user.seennotification = seennotification.concat(notification);
    user.notification = [];
    const updatedUser = await user.save();

    res.status(200).send({
      success: true,
      message: "Todas las notificaciones marcadas como leídas",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error al marcar las notificaciones como leídas",
      success: false,
      error,
    });
  }
};

const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: { id: req.body.userId },
    });

    user.notification = [];
    user.seennotification = [];

    const updatedUser = await user.save();
    updatedUser.password = undefined;

    res.status(200).send({
      success: true,
      message: "Notificaciones eliminadas con éxito",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "No se pudieron eliminar todas las notificaciones",
      error,
    });
  }
};

//GET ALL Solicitantes
const getAllSolicitantesController = async (req, res) => {
  try {
    const solicitantes = await solicitanteModel.findAll({
      where: {
        status: "aprobado",
      },
    });
    res.status(200).send({
      success: true,
      message: "Listas obtenidas con éxito",
      data: solicitantes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al buscar",
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

module.exports = {
  loginController,
  registerController,
  authController,
  applySolicitanteController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllSolicitantesController,
  getDatosUsuarioController,
};
