const connection = require('../database/db'); // assuming you have a file for database connection

function supplierModel() {

  const createSupplier = (supplierData, cb) => {
    const query = "INSERT INTO `suppliers`(`first_name`, `last_name`, `phone`, `email`, `photo`, `address`) VALUES (?,?,?,?,?,?)"
    const values = [
      supplierData.first_name,
      supplierData.last_name,
      supplierData.phone,
      supplierData.email,
      supplierData.photo,
      supplierData.address
    ];
    connection.query(query, values, cb)
  }

  const editSupplier = (supplierData, supplierId, cb) =>{
     const query = "UPDATE `suppliers` SET `first_name`=?,`last_name`=?,`phone`=?,`email`=?,`photo`=?,`address`=? WHERE id = ?";
     const values = [
      supplierData.first_name,
      supplierData.last_name,
      supplierData.phone,
      supplierData.email,
      supplierData.photo,
      supplierData.address,
      supplierId
    ];
     connection.query(query, values, cb)
  }

  const getAllSuppliers = (page = 1, limit =  20, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM suppliers`;
    const query = `SELECT * FROM suppliers ORDER BY ${ sort_by } ${ sort_order } LIMIT ${skip}, ${limit}`;
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

  const getSupplierById = (supplierId, cb) => {
    console.log('Get Supplier ID', supplierId);
    const query = "SELECT * FROM `suppliers` WHERE id = ?";
    connection.query(query, [supplierId], (err, result)=>{
      if(err){
        cb(err)
      }else{
        cb(null, result)
      }
    })
  }

  const searchSuppliers = (page = 1, limit = 20, searchQuery, cb) =>{
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM suppliers WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const deleteSupplier = (supplierId, cb) => {
    const query = "DELETE FROM `suppliers` WHERE id = ?"
    connection.query(query, [supplierId], cb)
  }


  return{
     createSupplier,
     editSupplier,
     getAllSuppliers,
     getSupplierById,
     searchSuppliers,
     deleteSupplier
  }
}

module.exports = supplierModel