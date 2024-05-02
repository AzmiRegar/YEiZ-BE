const express = require(`express`)
const app = express()
app.use(express.json())
const produkController = require(`../controllers/produk.controller`)
const { IsAdmin } = require("../middlewares/role.validation")
const { authorize } = require("../controllers/auth.controller")

app.get("/", produkController.getAllProduk)
app.get("/:key", produkController.findProduk)
app.post("/", produkController.addProduk)
app.put("/:id", produkController.updateProduk)
app.delete("/:id", produkController.deleteProduk)

module.exports = app