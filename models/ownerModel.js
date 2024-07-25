const connection = require('../database/db'); // assuming you have a file for database connection

function ownerModel() {

  const createOwner = (ownerData, cb) => {
    const query = "INSERT INTO `owners`(`first_name`, `last_name`, `phone`, `email`, `photo`, `address`) VALUES (?,?,?,?,?,?)"
    const values = [
      ownerData.first_name,
      ownerData.last_name,
      ownerData.phone,
      ownerData.email,
      ownerData.photo,
      ownerData.address
    ];
    connection.query(query, values, cb)
  }

  const editOwner = (ownerData, ownerId, cb) => {
    const query = "UPDATE `owners` SET `first_name`=?,`last_name`=?,`phone`=?,`email`=?,`photo`=?,`address`=? WHERE id = ?";
    const values = [
      ownerData.first_name,
      ownerData.last_name,
      ownerData.phone,
      ownerData.email,
      ownerData.photo,
      ownerData.address,
      ownerId
    ];
    connection.query(query, values, cb)
  }

  const getAllOwners = (page = 1, limit = 20, cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM owners`;
    const query = `SELECT * FROM owners LIMIT ${ skip }, ${ limit }`;

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


  const getOwnerById = (ownerId, cb) => {
    console.log('Get owner ID', ownerId);
    const query = "SELECT * FROM `owners` WHERE id = ?";
    connection.query(query, [ownerId], (err, result) => {
      if (err) {
        cb(err)
      } else {
        cb(null, result)
      }
    })
  }

  const searchOwners = (page = 1, limit = 20, searchQuery, cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM owners WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`;
    const query = `SELECT * FROM owners WHERE first_name LIKE '%${ searchQuery }%' OR last_name LIKE '%${ searchQuery }%' OR phone LIKE '%${ searchQuery }%' OR email LIKE '%${ searchQuery }%' OR address LIKE '%${ searchQuery }%' LIMIT ${ skip }, ${ limit }`

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

  const deleteOwner = (ownerId, cb) => {
    const query = "DELETE FROM `owners` WHERE id = ?"
    connection.query(query, [ownerId], cb)
  }


  return {
    createOwner,
    editOwner,
    getAllOwners,
    getOwnerById,
    searchOwners,
    deleteOwner
  }
}

module.exports = ownerModel