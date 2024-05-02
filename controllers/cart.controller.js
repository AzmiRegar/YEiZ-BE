const { request } = require('express');

const userModel = require('../models/index').user;
const productModel = require('../models/index').product;
const cartModel = require('../models/index').cart;


// Add to cart
exports.addCart = async(request, response) => {
    let userID = request.body.userID;
    let productID = request.body.productID;
    let quantity = request.body.quantity;

    // Pastikan user dan product tersedia sebelum menambahkan ke keranjang
    Promise.all([
        userModel.findByPk(userID),
        productModel.findByPk(productID)
    ])
    .then(([user, product,quantity]) => {
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
            quantity: quantity
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




// Delete cart item
exports.deleteCart = async (req, res) => {
    try {
        const { userID, productID } = req.params;
        const users = await userModel.findByPk(userID);

        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }

        const carts = await cartModel.findOne({ where: { userID }, include: productModel });

        if (!carts) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const products = cartModel.productModel.find((p) => p.productID === productID);

        if (!products) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        await productModel.destroy();
        res.status(200).json({ message: 'Product removed from cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing product from cart' });
    }
};