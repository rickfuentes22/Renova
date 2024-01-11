const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const sequelize = require("./config/db");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const PORT = process.env.APP_PORT || 8080;

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/solicitante", require("./routes/solicitanteRoutes"));
app.use("/api/v1/cita", require("./routes/citaRoutes"));
app.use(require("./routes/transaction.route"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/v1/admin/getPDF", (req, res) => {
  const pdfPath = req.query.pdfPath;
  const filePath = path.join(__dirname, "uploads", pdfPath);
  res.sendFile(filePath);
});

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
