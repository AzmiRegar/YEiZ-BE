const express = require(`express`)
const app = express()
app.use(express.json())
const userController = require(`../controllers/user.controller`)
const {validateUser} = require(`../middlewares/user.validation`)
const {authorize} = require(`../controllers/auth.controller`)
const {IsUser, IsAdmin} = require(`../middlewares/role.validation`)

app.get("/", authorize, IsAdmin, userController.getAllUser)
app.get("/:key",  userController.findUser)
app.post("/", validateUser, userController.addUser)
app.put("/:id", authorize, IsUser, validateUser, userController.updateUser)
app.delete("/:id", authorize, userController.deleteUser)
app.put("/reset/:id", userController.resetPass)
app.post("/register", validateUser, userController.register)

module.exports = app