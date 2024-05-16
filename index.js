const express = require(`express`)
const app = express()
const PORT = 2024

const cors = require(`cors`)
app.use(cors())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//user
const userRoute = require(`./routes/user.route`)
app.use(`/user`, userRoute)

//produk
const produkRoute = require(`./routes/produk.route`)
app.use(`/produk`, produkRoute)
app.use(express.static(__dirname))

//auth
const authRoute = require(`./routes/auth.route`)
app.use(`/login`, authRoute)

//cart
const cartRoute= require(`./routes/cart.route`)
app.use(`/cart`, cartRoute)

//transaction
const   transRoute = require(`./routes/transaction.route`)
app.use(`/transaction`, transRoute)

//port
app.listen(PORT, () => {
    console.log(`Server of YEiZ run on port ${PORT}`)
})