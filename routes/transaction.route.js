const express = require("express");
const app = express();
const Transaction = require("../controllers/transaction.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Endpoints
app.post("/create", Transaction.create);
app.post("/solicitante/horasagendadas", Transaction.commit);

app.get("/status/:token", Transaction.status);
module.exports = app;
