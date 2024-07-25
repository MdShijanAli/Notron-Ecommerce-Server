const categoryModel = require('../models/categoryModel')();
const formatResultData = require("../utils/formatResultsData");

function categoryController() {

  const createCategory = (req, res) => {
    const categoryData = req.body;
    categoryModel.createCategory(categoryData, (err, result) => {
      if (err) {
        console.error('Error Creating Category:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const categoryId = result.insertId;
        categoryModel.getCategoryById(categoryId, (err, result) => {
          if (err) {
            console.error('Error getting Category by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editCategory = (req, res) => {
    const categoryData = req.body;
    const categoryId = req.params.categoryID;
    categoryModel.editCategory(categoryData, categoryId, (err, result) => {
      if (err) {
        console.error('Error Updating Category:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        categoryModel.getCategoryById(categoryId, (err, result) => {
          if (err) {
            console.error('Error getting Category by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllCategory = (req, res) => {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    categoryModel.getAllCategory(pageNum, limitNum, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'categories',
          result: results,
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
    try {
      categoryModel.getCategoryById(categoryId, (err, result) => {
        if (err) {
          console.error('Error getting Category by ID:', err);
          res.status(404).json({ status: 'Bad Request', message: 'Category not found' });
        } else {
          res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null })
        }
      });
    }
    catch (err) {
      console.error('Error getting Category By ID:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  const deleteCategory = (req, res) => {
    const categoryId = req.params.categoryID;
    categoryModel.deleteCategory(categoryId, (err, result) => {
      if (err) {
        console.error('Error Deleting Category by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success', message: 'Executed Successfully' });
      }
    })
  }


  return {
    createCategory,
    editCategory,
    getAllCategory,
    getCategoryById,
    deleteCategory
  }
}

module.exports = categoryController