const ProductModel = require('../model/productModel');

class ProductController {
  getAllProducts(req, res) {
    const productModel = new ProductModel();
    productModel.getAllProducts((err, result) => {
      if (err) {
        console.error('Error getting products:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  }

  getProductById(req, res) {
    const productId = req.params.productId;
    const productModel = new ProductModel();
    productModel.getProductById(productId, (err, result) => {
      if (err) {
        console.error('Error getting product by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json(result);
      }
    });
  }

  // Add other CRUD operations as needed
}

module.exports = ProductController;
