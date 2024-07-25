const connection = require('../database/db'); // assuming you have a file for database connection

function managerModel() {

  const createManager = (managerData, cb) => {
    const query = "INSERT INTO `managers`(`first_name`, `last_name`, `phone`, `email`, `photo`, `address`) VALUES (?,?,?,?,?,?)"
    const values = [
      managerData.first_name,
      managerData.last_name,
      managerData.phone,
      managerData.email,
      managerData.photo,
      managerData.address
    ];
    connection.query(query, values, cb)
  }

  const editManager = (managerData, managerId, cb) =>{
     const query = "UPDATE `managers` SET `first_name`=?,`last_name`=?,`phone`=?,`email`=?,`photo`=?,`address`=? WHERE id = ?";
     const values = [
      managerData.first_name,
      managerData.last_name,
      managerData.phone,
      managerData.email,
      managerData.photo,
      managerData.address,
      managerId
    ];
     connection.query(query, values, cb)
  }

  const getAllManagers = (page = 1, limit =  20, cb) => {
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM managers LIMIT ${skip}, ${limit}`;
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const getManagerById = (managerId, cb) => {
    console.log('Get manager ID', managerId);
    const query = "SELECT * FROM `managers` WHERE id = ?";
    connection.query(query, [managerId], (err, result)=>{
      if(err){
        cb(err)
      }else{
        cb(null, result)
      }
    })
  }

  const searchManagers = (page = 1, limit = 20, searchQuery, cb) =>{
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM managers WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const deleteManager = (managerId, cb) => {
    const query = "DELETE FROM `managers` WHERE id = ?"
    connection.query(query, [managerId], cb)
  }


  return{
     createManager,
     editManager,
     getAllManagers,
     getManagerById,
     searchManagers,
     deleteManager
  }
}

module.exports = managerModel