const express = require(`express`)
const app = express()
app.use(express.json())
const transactionController = require("../controllers/transaction.controller")
const {authorize} = require("../controllers/auth.controller")
const {IsUser} = require("../middlewares/role.validation")

app.post("/", transactionController.buyCarts)
app.get("/", transactionController.getTransactionHistory)

module.exports = app