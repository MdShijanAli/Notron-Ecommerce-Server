const connection = require('../database/db'); // assuming you have a file for database connection

function productModel() {

  const createProduct = (productData, cb) => {
    const query = "INSERT INTO products (`img`, `code`, `category`, `title`, `price`, `description`, `long_description`, `information`, `discountPrice`, `size`, `color`, `offer`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const values = [
      JSON.stringify(productData.img),
      productData.code,
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
      productData.status
    ];
    connection.query(query, values, cb)
  }

  const editProductById = (productId, productData, cb) => {
    const query = "UPDATE `products` SET `img`= ?, `code`=?, `category`=?,`title`=?,`price`=?,`description`=?,`long_description`=?,`information`=?,`discountPrice`=?,`size`=?,`color`=?,`offer`=?,`status`=? WHERE id = ?";
    const values = [
      JSON.stringify(productData.img),
      productData.code,
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
      productData.status,
      productId
    ];
    connection.query(query, values, cb)
  }


  const getAllProducts = (page = 1, limit = 20, cb) => {
    const skip = (page - 1) * limit
    const totalQuery = `SELECT * FROM products`;
    // const query = `SELECT * FROM products LIMIT ${skip}, ${limit}`;
    const query = "SELECT b.id, b.name, b.stock, p.* FROM `brands` b, `products` p WHERE p.brand_id = b.id";
    connection.query(query, (err, results) => {
      if (err) {
        cb(err);
      } else {
        results.forEach(product => {

          // Ensure to safely parse JSON fields
          try {
            product.img = JSON.parse(product.img);
            product.category = JSON.parse(product.category);
            product.size = JSON.parse(product.size);
            product.color = JSON.parse(product.color);
            product.brand_id = { id: product.brand_id, name: product.name, stock: product.stock }
          } catch (parseError) {
            console.error("Error parsing JSON fields:", parseError);
          }
        });
        cb(null, results);
      }
    });

  }

  // Global Search
  const searchProducts = (page = 1, limit = 20, searchQuery, cb) => {
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM products WHERE title LIKE '%${ searchQuery }%' OR code LIKE '%${ searchQuery }%' OR description LIKE '%${ searchQuery }%' OR long_description LIKE '%${ searchQuery }%' OR information LIKE '%${ searchQuery }%' OR status LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results) => {
      if (err) {
        cb(err)
      } else {
        results.forEach(product => {

          // Ensure to safely parse JSON fields
          try {
            product.img = JSON.parse(product.img);
            product.category = JSON.parse(product.category);
            product.size = JSON.parse(product.size);
            product.color = JSON.parse(product.color);
            product.brand_id = { id: product.brand_id, name: product.name, stock: product.stock }
          } catch (parseError) {
            console.error("Error parsing JSON fields:", parseError);
          }
        });
        console.log('result:::::::', results);
        cb(null, results);
      }
    });
  }

  const getProductById = (productId, cb) => {
    // const query = 'SELECT * FROM products WHERE id = ?;';
    const query = 'SELECT b.id, b.name, b.stock, p.* FROM `brands` b, `products` p WHERE p.brand_id = b.id AND p.id = ?;';
    connection.query(query, [productId], (err, result) => {
      if (err) {
        cb(err);
      } else {
        // Check if the result has at least one row
        if (result.length > 0) {
          const product = result[0];
          // Parse JSON fields back to arrays
          product.img = JSON.parse(product.img);
          product.category = JSON.parse(product.category);
          product.size = JSON.parse(product.size);
          product.color = JSON.parse(product.color);
          product.brand_id = { id: product.brand_id, name: product.name, stock: product.stock }
        }
        cb(null, result);
      }
    });
  }


  const deleteProductById = (productId, cb) => {
    const query = "DELETE FROM products WHERE id = ?";
    connection.query(query, [productId], cb)
  }


  return {
    createProduct,
    editProductById,
    getAllProducts,
    getProductById,
    deleteProductById,
    searchProducts
  }

}

module.exports = productModel
