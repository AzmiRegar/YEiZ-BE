const express = require(`express`)
const app = express()
app.use(express.json())
const transactionController = require("../controllers/transaction.controller")
const {authorize} = require("../controllers/auth.controller")
const {IsAdmin, IsUser} = require("../middlewares/role.validation")

app.post("/", transactionController.buyCarts)
app.get("/", authorize, IsAdmin, transactionController.getTransactionHistory)
app.get('/showTransactionsbyUser', authorize, IsUser, transactionController.showTransbyUser)

module.exports = app