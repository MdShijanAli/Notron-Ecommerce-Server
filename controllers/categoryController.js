const categoryModel = require('../models/categoryModel')();
const formatResultData = require("../utils/formatResultsData");

function categoryController() {

  const createCategory = (req, res) => {
     const categoryData = req.body;
     categoryModel.createCategory(categoryData, (err, result)=>{
      if (err) {
        console.error('Error Creating Category:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const categoryId = result.insertId;
        categoryModel.getCategoryById(categoryId, (err, result) => {
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

  const getAllCategory = (req, res) => {
     const {page = 1, limit = 20 } = req.query;
     const pageNum = parseInt(page);
     const limitNum = parseInt(limit);
     categoryModel.getAllCategory(pageNum, limitNum, (err, result)=>{
      try {

        const total = result?.length;
  
        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'categories',
          result: result,
          totalResults: total
        })
  
      } catch (err) {
        console.error('Error getting Categories:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }

  const getCategoryById = (req, res) => {
    const categoryId = req.params.categoryID;
    try{
    categoryModel.getCategoryById(categoryId, (err, result)=>{
      if (err) {
        console.error('Error getting Category by ID:', err);
        res.status(404).json({ status: 'Bad Request', message: 'Category not found' });
      } else {
        res.json({status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null})
      }
    });
  }
  catch (err) {
    console.error('Error getting Category By ID:', err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}


  return{
    createCategory,
    getAllCategory,
    getCategoryById
  }
}

module.exports = categoryController