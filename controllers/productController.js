const ProductModel = require('../models/productModel');

class ProductController {

  createProduct(req, res){
    const productData = req.body;
    const productModel = new ProductModel();
    productModel.createProduct(productData, (err, result)=>{
      if(err){
        console.error('Error Creating products:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        const productId = result.insertId;
        productModel.getProductById(productId, (err, result) => {
          if (err) {
            console.error('Error getting product by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  editProductById(req, res){
    const productData = req.body;
    const productId = req.params.productId;
    const productModel = new ProductModel();
    productModel.editProductById(productId, productData, (err, result)=>{
      if(err){
        console.error('Error Updating products:', err);
        res.status(500).send('Internal Server Error');
      }
      else{
        productModel.getProductById(productId, (err, result) => {
          if (err) {
            console.error('Error getting product by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  getAllProducts(req, res) {
    const productModel = new ProductModel();
    productModel.getAllProducts((err, result) => {
      if (err) {
        console.error('Error getting products:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({status: 'success', message: 'Executed Successfully', data: result});
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
        res.json({status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null})
      }
    });
  }

  deleteProductById(req, res){
    const productId = req.params.productId;
    const productModel = new ProductModel();
    productModel.deleteProductById(productId, (err, result)=>{
      if (err) {
        console.error('Error getting product by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success' , message: 'Executed Successfully' });
      }
    })
  }
}

module.exports = ProductController;
