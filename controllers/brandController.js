const brandModel = require('../models/brandModel')();
const formatResultData = require("../utils/formatResultsData");

function brandController() {

  const createBrand = (req, res) => {
    const brandData = req.body;
    brandModel.createBrand(brandData, (err, result) => {
      if (err) {
        console.error('Error Creating brands:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const brandId = result.insertId;
        brandModel.getBrandById(brandId, (err, result) => {
          if (err) {
            console.error('Error getting Brand by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editBrand = (req, res) => {
    const brandData = req.body;
    const brandId = req.params.brandID;
    brandModel.editBrand(brandData, brandId, (err, result) => {
      if (err) {
        console.error('Error UPDATING brands:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        brandModel.getBrandById(brandId, (err, result) => {
          if (err) {
            console.error('Error getting Brand by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllBrands = (req, res) => {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    brandModel.getAllBrands(pageNum, limitNum, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'brands',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting Brnads:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }

  const searchBrands = (req, res) => {
    const { page = 1, limit = 20, search = '', sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    brandModel.searchBrands(pageNum, limitNum, search, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'brands',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting Brands:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }

  const getBrandById = (req, res) => {
    const brandId = req.params.brandID;
    try {
      brandModel.getBrandById(brandId, (err, result) => {
        if (err) {
          console.error('Error getting Brand by ID:', err);
          res.status(404).json({ status: 'Bad Request', message: 'Brand not found' });
        } else {
          res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null })
        }
      });
    }
    catch (err) {
      console.error('Error getting Brand By ID:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  const deleteBrand = (req, res) => {
    const brandId = req.params.brandID;
    brandModel.deleteBrand(brandId, (err, result) => {
      if (err) {
        console.error('Error Deleting product by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success', message: 'Executed Successfully' });
      }
    })
  }

  return {
    createBrand,
    getAllBrands,
    getBrandById,
    editBrand,
    searchBrands,
    deleteBrand
  }

}

module.exports = brandController