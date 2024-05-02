const express = require(`express`)
const app = express()
app.use(express.json())
const transactionController = require("../controllers/transaction.controller")

app.post("/", transactionController.addTransaction)
app.get("/", transactionController.getTransactionHistory)

module.exports = app