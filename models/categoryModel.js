const connection = require('../database/db'); // assuming you have a file for database connection

function categoryModel(){

  const createCategory = (categoryData, cb) =>{
    console.log('categoryData====>', categoryData);
    const query = "INSERT INTO `categories`(`name`, `stock`) VALUES (?,?)"
    const values = [
      categoryData.name,
      categoryData.stock
    ]
    connection.query(query, values, cb)
  }

  const getCategoryById = (categoryId, cb) => {
     const query = "SELECT * FROM categories WHERE id = ?";
     connection.query(query, [categoryId], (err, result)=>{
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  }


  return{
    createCategory,
    getCategoryById
  }
}

module.exports = categoryModel