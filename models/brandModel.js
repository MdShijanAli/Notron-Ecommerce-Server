const connection = require('../database/db'); // assuming you have a file for database connection

function brandModel(){

  const createBrand = (brandData, cb)=> {
    const query = "INSERT INTO `brands`( `name`, `stock`) VALUES (?,?)";
    const values = [
      brandData.name,
      brandData.stock
    ];
    connection.query(query, values, cb)
  }

  const editBrand = (brandData, brandId, cb)=> {
    const query = "UPDATE `brands` SET `name`=?,`stock`=? WHERE id = ?";
    const values = [
      brandData.name,
      brandData.stock,
      brandId
    ];
    connection.query(query, values, cb)
  }

  const getAllBrands = (page = 1, limit = 20, cb) =>{
     const skip = (page - 1) * limit;
     const total = "SELECT * from brands";
     const query = `SELECT * from brands LIMIT ${skip}, ${limit}`;
     connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      } else{
        cb(null, results)
      }
     })
  }

  const getBrandById = (brandId, cb) => {
    const query = 'SELECT * FROM brands WHERE id = ?;';
    connection.query(query, [brandId], (err, result) => {
      if (err) {
        cb(err);
      } else {
        cb(null, result);
      }
    });
  }

  const deleteBrand = (brandId, cb) => {
     const query = "DELETE FROM `brands` WHERE id = ?"
     connection.query(query, [brandId], cb)
  }



  return {
    createBrand,
    getAllBrands,
    getBrandById,
    editBrand,
    deleteBrand
  }

}

module.exports = brandModel