const express = require(`express`)
const app = express()
app.use(express.json()) 
const cartController = require(`../controllers/cart.controller`)

app.get(`/`, cartController.getAllCart)
app.post('/', cartController.addCart)
app.delete('/:id', cartController.deleteCart)

module.exports = app