const express = require(`express`)
const app = express()
app.use(express.json()) 
const cartController = require(`../controllers/cart.controller`)
const { IsUser,IsAdmin } = require("../middlewares/role.validation")
const { authorize } = require("../controllers/auth.controller")

app.get(`/`, authorize, IsAdmin, cartController.getAllCart)
app.post('/', authorize, IsUser, cartController.addCart)
app.get('/showCartbyUser', authorize, IsUser, cartController.showCartbyUser)

module.exports = app