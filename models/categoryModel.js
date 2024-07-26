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

  const getAllCategory = (page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM categories`;
    const query = `SELECT * FROM categories ORDER BY ${ sort_by } ${ sort_order } LIMIT ${ skip }, ${ limit }`
    connection.query(totalQuery, (err, totalResult) => {
      if (err) {
        return cb(err);
      }

      const total = totalResult[0].count;

      connection.query(query, (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, { results, total });
        }
      });
    });
  };

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

  const searchCategories = (page = 1, limit = 20, searchQuery, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM categories WHERE name LIKE '%${ searchQuery }%' OR stock = '${ searchQuery }'`;
    const query = `SELECT * FROM categories WHERE name LIKE '%${ searchQuery }%' OR stock = '${ searchQuery }' ORDER BY ${ sort_by } ${ sort_order } LIMIT ${ skip }, ${ limit }`

    connection.query(totalQuery, (err, totalResult) => {
      if (err) {
        return cb(err);
      }

      const total = totalResult[0].count;

      connection.query(query, (err, results) => {
        if (err) {
          cb(err);
        } else {
          cb(null, { results, total });
        }
      });
    });
  };

  const deleteCategory = (categoryId, cb) => {
    const query = "DELETE FROM `categories` WHERE id = ?"
    connection.query(query, [categoryId], cb)
  }


  return {
    createCategory,
    editCategory,
    getAllCategory,
    getCategoryById,
    searchCategories,
    deleteCategory
  }
}

module.exports = categoryModel