const transactionModel = require(`../models/index`).transaction
const userModel = require(`../models/index`).user
const cartModel = require(`../models/index`).cart
const productModel = require(`../models/index`).product
const detailModel = require(`../models/index`).detail

exports.addTransaction = async (req, res) => {
  try {
    const { userID, Items } = req.body;

    if (!Array.isArray(Items) || Items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Items harus berupa array yang tidak kosong'
      });
    }

    // Mengumpulkan seluruh productID yang terdapat dalam Items
    const productIDs = Items.map(item => item.productID);

    // Mengambil data produk dari database berdasarkan productIDs
    const products = await productModel.findAll({ where: { productID: productIDs } });

    // Mengumpulkan seluruh cart yang akan dibeli
    const carts = await cartModel.findAll({ where: { userID, productID: productIDs } });

    // Menghitung total harga transaksi
    let totalHarga = 0;
    for (const item of Items) {
      const product = products.find(p => p.productID === item.productID);
      const cart = carts.find(c => c.productID === item.productID);

      if (!product || !cart || cart.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Data produk atau cart tidak valid'
        });
      }

      // Periksa jika kuantitas yang diminta melebihi stok
      if (item.quantity > product.stokproduct) {
        return res.status(400).json({
          success: false,
          message: 'Kuantitas produk melebihi stok yang tersedia'
        });
      }

      totalHarga += product.price * item.quantity;
    }

    // Membuat transaksi baru
    const newTransaction = await transactionModel.create({
      userID,
      totalHarga,
      tanggal: new Date()
    });

    // Memasukkan riwayat transaksi ke dalam tabel detail
    for (const item of Items) {
      await detailModel.create({
        transactionID: newTransaction.transID,
        productID: item.productID,
        quantity: item.quantity
      });
    }

    // Menghapus cart yang telah dibeli
    await cartModel.destroy({ where: { userID, productID: productIDs } });

    return res.status(200).json({
      success: true,
      message: 'Transaksi berhasil',
      transaction: newTransaction
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// Controller untuk mendapatkan riwayat transaksi pengguna
exports.getTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Cari riwayat transaksi pengguna
    const transactions = await Transaction.findAll({ where: { userId }, include: Transaction });

    res.json(transactions);
  } catch (error) {
    console.error('Error getting transaction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};