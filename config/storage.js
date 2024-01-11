const multer = require("multer");

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ruta donde se guardarán los archivos subidos
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Generar nombres de archivo únicos
    cb(null, file.originalname);
  },
});

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: {
    // Establecer límites para el tamaño de archivo y la cantidad máxima de archivos
    fileSize: 1024 * 1024 * 5, // Tamaño máximo de 5MB por archivo (puedes ajustar este valor)
    files: 2, // Máximo 2 archivos
  },
});

module.exports = upload;
