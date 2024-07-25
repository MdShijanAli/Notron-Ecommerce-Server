const productModel = require('../models/productModel')();
const formatResultData = require("../utils/formatResultsData");

function productController() {

  const createProduct = (req, res) => {
    const productData = req.body;
    console.log('Product Date=====>', productData);
    productModel.createProduct(productData, (err, result) => {
      if (err) {
        console.error('Error Creating products:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const productId = result.insertId;
        productModel.getProductById(productId, (err, result) => {
          if (err) {
            console.error('Error getting product by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editProductById = (req, res) => {
    const productData = req.body;
    const productId = req.params.productId;
    productModel.editProductById(productId, productData, (err, result) => {
      if (err) {
        console.error('Error Updating products:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        productModel.getProductById(productId, (err, result) => {
          if (err) {
            console.error('Error getting product by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllProducts = (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    productModel.getAllProducts(pageNum, limitNum, async (err, data) => {

      try {

        const {results, total} = data

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'products',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }

  const searchProducts = (req, res) => {
    const { page = 1, limit = 20, search = "" } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    productModel.searchProducts(pageNum, limitNum, search, async (err, data) => {
      try {

        const {results, total} = data

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'products',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting products:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }

  const getProductById = (req, res) => {
    const productId = req.params.productId;
    try {
      productModel.getProductById(productId, (err, result) => {
        if (err) {
          console.error('Error getting product by ID:', err);
          res.status(404).json({ status: 'Bad Request', message: 'Product not found' });
        } else {
          res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null })
        }
      });
    }
    catch (err) {
      console.error('Error getting Product By ID:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  const deleteProductById = (req, res) => {
    const productId = req.params.productId;
    productModel.deleteProductById(productId, (err, result) => {
      if (err) {
        console.error('Error Deleting product by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success', message: 'Executed Successfully' });
      }
    })
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

module.exports = productController;
