const {
  createTransaction,
  commitTransaction,
  statusTransaction,
} = require("../Service/transaction.service");
const {
  randomBuyOrderNumber,
  ApprovedOrRejectedMessage,
} = require("../Service/utilities.service");
require("./../config/Config");

let create = async (req, res) => {
  try {
    let body = req.body;
    const amount = body.amount;
    const buyOrderNumber = randomBuyOrderNumber();
    const responseCreateTransaction = await createTransaction(
      buyOrderNumber,
      amount
    );
    const tokenTransaction = responseCreateTransaction.token;
    res.status(200).send({
      url: responseCreateTransaction.url + "?token_ws=" + tokenTransaction,
      token: tokenTransaction,
    });
  } catch (err) {
    console.log("🚀 ~ file: webpay.controller.js ~ line 5 ~ pay ~ err", err);
    res.status(400).send(err);
  }
};

let commit = async (req, res) => {
  try {
    res.redirect("/solicitante/horasagendadas");
  } catch (err) {
    console.error(
      "🚀 ~ file: transaction.controller.js ~ line 34 ~ commit ~ err",
      err
    );
    throw err;
  }
};

let status = async (req, res) => {
  try {
    const token = req.params.token;
    const responseStatusTransaction = await statusTransaction(token);
    res.status(200).send(responseStatusTransaction);
  } catch (err) {
    res.status(400).send(err);
    console.log(
      "🚀 ~ file: transaction.controller.js ~ line 56 ~ status ~ err",
      err
    );
  }
};

module.exports = {
  create,
  commit,
  status,
};
