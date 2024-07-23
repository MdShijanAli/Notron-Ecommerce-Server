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

  const getAllCategory = (page = 1, limit = 20, cb) => {
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM categories LIMIT ${skip}, ${limit}`
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
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
    getAllCategory,
    getCategoryById
  }
}

module.exports = categoryModel