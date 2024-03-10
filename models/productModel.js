const connection = require('../database/db'); // assuming you have a file for database connection

class ProductModel {

  createProduct(productData, cb){
    const query = "INSERT INTO products (`img`, `category`, `title`, `price`, `description`, `long_description`, `information`, `discountPrice`, `size`, `color`, `offer`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      JSON.stringify(productData.img),
      JSON.stringify(productData.category),
      productData.title,
      productData.price,
      productData.description,
      productData.long_description,
      productData.information,
      productData.discountPrice,
      JSON.stringify(productData.size),
      JSON.stringify(productData.color),
      productData.offer
    ];
    connection.query(query, values, cb)
  }

  editProductById(productId, productData, cb){
    const query = "UPDATE `products` SET `img`= ?,`category`=?,`title`=?,`price`=?,`description`=?,`long_description`=?,`information`=?,`discountPrice`=?,`size`=?,`color`=?,`offer`=? WHERE id = ?";
    const values = [
      JSON.stringify(productData.img),
      JSON.stringify(productData.category),
      productData.title,
      productData.price,
      productData.description,
      productData.long_description,
      productData.information,
      productData.discountPrice,
      JSON.stringify(productData.size),
      JSON.stringify(productData.color),
      productData.offer,
      productId
    ];
    connection.query(query, values, cb)
  }

  getAllProducts(cb) {
    const query = 'SELECT * FROM products';
    connection.query(query, cb);
  }

  getProductById(productId, cb) {
    const query = 'SELECT * FROM products where id = ?;';
    connection.query(query, [productId], cb);
  }

  deleteProductById(productId, cb){
    const query = "DELETE FROM `products` WHERE id = ?";
    connection.query(query, [productId], cb)
  }
}

module.exports = ProductModel;
