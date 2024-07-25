const connection = require('../database/db'); // assuming you have a file for database connection

function salesMansModel() {

  const createSalesMans = (SalesMansData, cb) => {
    const query = "INSERT INTO `sales_mans`(`first_name`, `last_name`, `phone`, `email`, `photo`, `address`) VALUES (?,?,?,?,?,?)"
    const values = [
      SalesMansData.first_name,
      SalesMansData.last_name,
      SalesMansData.phone,
      SalesMansData.email,
      SalesMansData.photo,
      SalesMansData.address
    ];
    connection.query(query, values, cb)
  }

  const editSalesMans = (SalesMansData, SalesMansId, cb) =>{
     const query = "UPDATE `sales_mans` SET `first_name`=?,`last_name`=?,`phone`=?,`email`=?,`photo`=?,`address`=? WHERE id = ?";
     const values = [
      SalesMansData.first_name,
      SalesMansData.last_name,
      SalesMansData.phone,
      SalesMansData.email,
      SalesMansData.photo,
      SalesMansData.address,
      SalesMansId
    ];
     connection.query(query, values, cb)
  }

  const getAllSalesMans = (page = 1, limit =  20, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM sales_mans`;
    const query = `SELECT * FROM sales_mans ORDER BY ${ sort_by } ${ sort_order } LIMIT ${skip}, ${limit}`;
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

  const getSalesMansById = (SalesMansId, cb) => {
    console.log('Get SalesMans ID', SalesMansId);
    const query = "SELECT * FROM `sales_mans` WHERE id = ?";
    connection.query(query, [SalesMansId], (err, result)=>{
      if(err){
        cb(err)
      }else{
        cb(null, result)
      }
    })
  }

  const searchSalesMans = (page = 1, limit = 20, searchQuery, cb) =>{
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM sales_mans WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const deleteSalesMans = (SalesMansId, cb) => {
    const query = "DELETE FROM `sales_mans` WHERE id = ?"
    connection.query(query, [SalesMansId], cb)
  }


  return{
     createSalesMans,
     editSalesMans,
     getAllSalesMans,
     getSalesMansById,
     searchSalesMans,
     deleteSalesMans
  }
}

module.exports = salesMansModel