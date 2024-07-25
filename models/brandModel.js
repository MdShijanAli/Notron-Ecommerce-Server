const connection = require('../database/db'); // assuming you have a file for database connection

function brandModel() {

  const createBrand = (brandData, cb) => {
    const query = "INSERT INTO `brands`( `name`, `stock`) VALUES (?,?)";
    const values = [
      brandData.name,
      brandData.stock
    ];
    connection.query(query, values, cb)
  }

  const editBrand = (brandData, brandId, cb) => {
    const query = "UPDATE `brands` SET `name`=?,`stock`=? WHERE id = ?";
    const values = [
      brandData.name,
      brandData.stock,
      brandId
    ];
    connection.query(query, values, cb)
  }

  const getAllBrands = (page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM brands`;
    const query = `SELECT * from brands ORDER BY ${ sort_by } ${ sort_order } LIMIT ${ skip }, ${ limit }`;
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

  const searchBrands = (page = 1, limit = 20, searchQuery, sort_by = 'created_at', sort_order = 'DESC', cb) => {
    const skip = (page - 1) * limit;
    const totalQuery = `SELECT COUNT(*) as count FROM brands WHERE name LIKE '%${ searchQuery }%' OR stock = '${ searchQuery }'`;
    const query = `SELECT * FROM brands WHERE name LIKE '%${ searchQuery }%' OR stock = '${ searchQuery }' ORDER BY ${ sort_by } ${ sort_order } LIMIT ${ skip }, ${ limit }`

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

  const deleteBrand = (brandId, cb) => {
    const query = "DELETE FROM `brands` WHERE id = ?"
    connection.query(query, [brandId], cb)
  }



  return {
    createBrand,
    getAllBrands,
    getBrandById,
    editBrand,
    searchBrands,
    deleteBrand
  }

}

module.exports = brandModel