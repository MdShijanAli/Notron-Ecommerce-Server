const supplierModel = require('../models/supplierModel')();
const formatResultData = require("../utils/formatResultsData");

function supplierController() {

  const createSupplier = (req, res) => {
    const supplierData = req.body;
    supplierModel.createSupplier(supplierData, (err, result) => {
      if (err) {
        console.error('Error Creating Suppliers:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const supplierId = result.insertId;
        supplierModel.getSupplierById(supplierId, (err, result) => {
          if (err) {
            console.error('Error getting Supplier by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editSupplier = (req, res) => {
    const supplierData = req.body;
    const supplierId = req.params.supplierID
    supplierModel.editSupplier(supplierData, supplierId, (err, result) => {
      if (err) {
        console.error('Error Updating Suppliers:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        supplierModel.getSupplierById(supplierId, (err, result) => {
          if (err) {
            console.error('Error getting Supplier by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllSuppliers = (req, res) => {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    supplierModel.getAllSuppliers(pageNum, limitNum, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'suppliers',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting Suppliers:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }


  const getSupplierById = (req, res) => {
    const supplierId = req.params.supplierID;
    try {
      supplierModel.getSupplierById(supplierId, (err, result) => {
        if (err) {
          console.error('Error getting Supplier by ID:', err);
          res.status(404).json({ status: 'Bad Request', message: 'Supplier not found' });
        } else {
          res.json({
            status: 'success', message: 'Executed Successfully', data: result.length > 0 ?
              {
                "id": result[0].id,
                "display_name": result[0].first_name + " " + result[0].last_name,
                "phone": result[0].phone,
                "email": result[0].email,
                "photo": result[0].photo,
                "address": result[0].address,
                "created_at": result[0].created_at,
                "updated_at": result[0].updated_at
              }
              : null
          })
        }
      });
    }
    catch (err) {
      console.error('Error getting Supplier By ID:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  const searchSuppliers = (req, res) => {
    const { page = 1, limit = 20, search = "", sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    supplierModel.searchSuppliers(pageNum, limitNum, search, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'suppliers',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting suppliers:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }


  const deleteSupplier = (req, res) => {
    const supplierId = req.params.supplierID;
    supplierModel.deleteSupplier(supplierId, (err, result) => {
      if (err) {
        console.error('Error Deleting Supplier by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success', message: 'Executed Successfully' });
      }
    })
  }



  return {
    createSupplier,
    editSupplier,
    getAllSuppliers,
    getSupplierById,
    searchSuppliers,
    deleteSupplier
  }
}

module.exports = supplierController