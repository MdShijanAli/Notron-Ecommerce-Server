const connection = require('../database/db'); // assuming you have a file for database connection

class ProductModel {
  getAllProducts(callback) {
    const query = 'SELECT * FROM products';
    connection.query(query, callback);
  }

  getProductById(productId, callback) {
    const query = 'SELECT * FROM products where id = ?;';
    connection.query(query, [productId], callback);
  }

  // Add other CRUD operations as needed
}

module.exports = ProductModel;
