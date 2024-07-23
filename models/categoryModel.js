const connection = require('../database/db'); // assuming you have a file for database connection

function categoryModel() {

  const createCategory = (categoryData, cb) => {
    const query = "INSERT INTO `categories`(`name`, `stock`) VALUES (?,?)"
    const values = [
      categoryData.name,
      categoryData.stock
    ]
    connection.query(query, values, cb)
  }

  const editCategory = (categoryData, categoryId, cb) => {
    const query = "UPDATE `categories` SET `name`=?,`stock`=? WHERE id = ?"
    const values = [
      categoryData.name,
      categoryData.stock,
      categoryId
    ]
    connection.query(query, values, cb)
  }

  const getAllCategory = (page = 1, limit = 20, cb) => {
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM categories LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results) => {
      if (err) {
        cb(err)
      } else {
        cb(null, results)
      }
    })
  }

  const getCategoryById = (categoryId, cb) => {
    const query = "SELECT * FROM categories WHERE id = ?";
    connection.query(query, [categoryId], (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  }

  const deleteCategory = (categoryId, cb) => {
    const query = "DELETE FROM `categories` WHERE id = ?"
    connection.query(query, [categoryId], cb)
  }


  return {
    createCategory,
    editCategory,
    getAllCategory,
    getCategoryById,
    deleteCategory
  }
}

module.exports = categoryModel