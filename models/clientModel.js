const connection = require('../database/db'); // assuming you have a file for database connection

function clientModel() {

  const createClient = (clientData, cb) => {
    const query = "INSERT INTO `clients`(`first_name`, `last_name`, `phone`, `email`, `photo`, `address`) VALUES (?,?,?,?,?,?)"
    const values = [
      clientData.first_name,
      clientData.last_name,
      clientData.phone,
      clientData.email,
      clientData.photo,
      clientData.address
    ];
    connection.query(query, values, cb)
  }

  const editClient = (clientData, clientId, cb) =>{
     const query = "UPDATE `clients` SET `first_name`=?,`last_name`=?,`phone`=?,`email`=?,`photo`=?,`address`=? WHERE id = ?";
     const values = [
      clientData.first_name,
      clientData.last_name,
      clientData.phone,
      clientData.email,
      clientData.photo,
      clientData.address,
      clientId
    ];
     connection.query(query, values, cb)
  }

  const getAllClients = (page = 1, limit =  20, cb) => {
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM clients LIMIT ${skip}, ${limit}`;
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const getClientById = (clientId, cb) => {
    console.log('Get client ID', clientId);
    const query = "SELECT * FROM `clients` WHERE id = ?";
    connection.query(query, [clientId], (err, result)=>{
      if(err){
        cb(err)
      }else{
        cb(null, result)
      }
    })
  }

  const searchClients = (page = 1, limit = 20, searchQuery, cb) =>{
    const skip = (page - 1) * limit;
    const query = `SELECT * FROM clients WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`
    connection.query(query, (err, results)=>{
      if(err){
        cb(err)
      }else{
        cb(null, results)
      }
    })
  }

  const deleteClient = (clientId, cb) => {
    const query = "DELETE FROM `clients` WHERE id = ?"
    connection.query(query, [clientId], cb)
  }


  return{
     createClient,
     editClient,
     getAllClients,
     getClientById,
     searchClients,
     deleteClient
  }
}

module.exports = clientModel