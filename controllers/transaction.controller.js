const { cart: Cart, transaction: Transaction, product: Product, user: User } = require('../models');

exports.buyCarts = async (req, res) => {
  try {
    const { Carts } = req.body;

    let totalHarga = 0;
    const cartDetails = [];

    // Loop through each cart 
    for (const cartItem of Carts) {
      const { cartID } = cartItem;

      // Get the cart details
      const cart = await Cart.findOne({
        where: { cartID: cartID, status: false }, // Assuming status indicates if it's not purchased
        include: [{ model: Product }]
      });

      if (!cart) {
        throw new Error(`Cart ${cartID} is not available for purchase.`);
      }

      // Add the price of the product to the total harga
      totalHarga += cart.price * cart.quantity;

      // Update cart status to indicate it has been purchased
      await cart.update({ status: true });

      // Create transaction record
      const detail = await Transaction.create({
        cartID: cart.cartID,
        productID: cart.productID,
        date: new Date(),
        price: cart.price,
        total: totalHarga
      });

      // Push cart details into cartDetails array
      cartDetails.push(detail);
    }


    return res.status(201).json({
      success: true,
      Data: {
        carts: cartDetails
      },
      message: "Purchased successfully."
    });
  } catch (error) {
    console.error("Error buying carts:", error);
    return res.status(500).json({ success: false, message: "Failed to buy carts. Please try again later." });
  }
};




// Controller untuk mendapatkan riwayat transaksi pengguna
exports.getTransactionHistory = async (req, res) => {
  try { 

    // Find transaction history for the user including product details
    const transactions = await Transaction.findAll({});

    res.json(transactions);
  } catch (error) {
    console.error('Error getting transaction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};