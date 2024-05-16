const { request } = require('express');

const userModel = require('../models/index').user;
const productModel = require('../models/index').product;
const cartModel = require('../models/index').cart;
const Op = require(`sequelize`).Op


// Add to cart
exports.addCart = async(request, response) => {
    let userID = request.body.userID;
    let productID = request.body.productID;
    let quantity = request.body.quantity;
    let price = request.body.price;
    let payment = request.body.payment_method;
    let status = request.body.status

    // Pastikan user dan product tersedia sebelum menambahkan ke keranjang
    Promise.all([
        userModel.findByPk(userID),
        productModel.findByPk(productID)
    ])
    .then(([user, product]) => {
        if (!user) {
            throw new Error("User not found");
        }
        if (!product) {
            throw new Error("Product not found");
        }
        if(!quantity) {
            throw new Error("Enter the quantity you want");
        }
        
        let newCart = {
            userID: userID,
            productID: productID,
            quantity: quantity,
            price: price,
            payment_method: payment,
            status: status
        };

        return cartModel.create(newCart);
    })
    .then(result => {
        return response.json({
            success: true,
            data: result,
            message: `New item added to cart`
        });
    })
    .catch(error => {
        return response.json({
            success: false,
            message: error.message
        });
    });
};

exports.showCartbyUser = async (request, response) => {
    const userId = request.user.userID; // Mengambil ID pengguna dari sesi atau token, sesuaikan dengan implementasi autentikasi Anda
    try {
        const carts = await cartModel.findAll({
            where: {
                userID: { [Op.substring]: userId } // Mengambil tiket yang dimiliki oleh pengguna dengan ID yang sesuai
            },
            include: [
                { model: userModel, attributes: ['firstName', 'lastName'] },
                { model: productModel, attributes: ['product_name', 'type', 'price'] }
            ]
        });
        return response.json({
            success: true,
            data: carts,
            message: `User's carts have been loaded`
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            success: false,
            message: `Failed to load user's carts`
        });
    }
};

// Show all cart items
// exports.showAllCart = async (req, res) => {
//     try {
//         const userID = req.params.userID;

//         //mencari user
//         const userSearch = await user.findByPk(userID);

//         if (!userSearch) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const cartSearch = await Cart.findOne({ where: { userId }, include: Product });

//         if (!cart) {
//             return res.status(404).json({ message: 'Cart not found' });
//         }

//         res.status(200).json(cart.products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error fetching cart items' });
//     }
// };

exports.getAllCart = async (request, response) => {
    let carts = await cartModel.findAll(
        {
            include: [
                { model: userModel, attributes: ['firstName', `lastName`] },
                { model: productModel, attributes: ['product_name', `type`] }
            ]
        }
    )
    return response.json({
        success: true,
        data: carts,
        messaage: `All carts have been loaded`
    })
}