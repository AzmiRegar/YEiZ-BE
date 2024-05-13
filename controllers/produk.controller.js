const productModel = require(`../models/index`).product
const Op = require(`sequelize`).Op
const path = require(`path`)
const fs = require(`fs`)

exports.getAllProduk = async (request,response) => {
    let products = await productModel.findAll()
    return response.json({
        success: true,
        data: products,
        message: `All Products have been loaded`
    })
}

exports.findProduk = async (request, response) => {
    let keyword = request.params.key
    let products = await productModel.findAll({
        where: {
            [Op.or]: [
                {product_name: { [Op.substring]: keyword} },
                {type: { [Op.substring]: keyword} },
                {price: { [Op.substring]: keyword} },
                {stok: { [Op.substring]: keyword} }
            ]
        }
    })
    return response.json({
        success: true,
        data: products,
        message: `All Products have been loaded`
    })
}

const upload = require(`./upload-image`).single(`image`)

exports.addProduk = (request,response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error})
        }
        if (!request.file) {
            return response.json({ message: `Nothing to Upload`})
        }

        let newProduk = {
            product_name: request.body.product_name,
            type: request.body.type,
            stok: request.body.stok,
            price: request.body.price,
            image: request.file.filename
        }

        productModel.create(newProduk)
        .then(result => {
            return response.json({
                success: true,
                data: result,
                message: `New Produk has been inserted`
            })
        })
        .catch (error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
    })
}


exports.updateProduk = async (request,response) => {
    upload(request,response, async error => {
        if (error) {
            return response.json({ message: error})
        }

        let productID = request.params.id
        let dataProduct = {
            product_name: request.body.product_name,
            type: request.body.type,
            price: request.body.price,
            stok: request.body.stok
        }

        if (request.file) {
            const selectedProduk = await productModel.findOne({
                where: {productID:productID}
            })

            const oldImage = selectedProduk.image
            const pathImage = path.join(__dirname, `../image`, oldImage)
            if(fs.existsSync(pathImage)) {
                fs.unlink(pathImage, error => console.log(error))
            }
            dataProduct.image = request.file.filename  
        }

        productModel.update(dataProduct, { where: { productID: productID }})
            .then(result => {
                return response.json({
                    success: true,
                    message: `Data produk has been updated`
                })
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}


exports.deleteProduk = async (request, response) => {
    const productID = request.params.id
    const produk = await productModel.findOne({where: {productID:productID}})
    const oldImage = produk.image
    const pathImage = path.join(__dirname, `../image`, oldImage)

    if(fs.existsSync(pathImage)) {
        fs.unlink(pathImage, error => console.log(error))
    }
    productModel.destroy({ where: {productID: productID}})
        .then(result => {
            return response.json({
                success: true,
                message: `Data produk has been deleted`
            })
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            })
        })
}