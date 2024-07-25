const ownerModel = require('../models/ownerModel')();
const formatResultData = require("../utils/formatResultsData");

function ownerController() {

  const createOwner = (req, res) => {
    const ownerData = req.body;
    ownerModel.createOwner(ownerData, (err, result) => {
      if (err) {
        console.error('Error Creating owners:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const ownerId = result.insertId;
        ownerModel.getOwnerById(ownerId, (err, result) => {
          if (err) {
            console.error('Error getting owner by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editOwner = (req, res) => {
    const ownerData = req.body;
    const ownerId = req.params.ownerID
    ownerModel.editOwner(ownerData, ownerId, (err, result) => {
      if (err) {
        console.error('Error Updating owners:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        ownerModel.getOwnerById(ownerId, (err, result) => {
          if (err) {
            console.error('Error getting owner by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllOwners = (req, res) => {
    const { page = 1, limit = 20, sort_by = 'created_at', sort_order = 'DESC' } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    ownerModel.getAllOwners(pageNum, limitNum, sort_by, sortOrder, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'owners',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting owners:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }


  const getOwnerById = (req, res) => {
    const ownerId = req.params.ownerID;
    try {
      ownerModel.getOwnerById(ownerId, (err, result) => {
        if (err) {
          console.error('Error getting owner by ID:', err);
          res.status(404).json({ status: 'Bad Request', message: 'owner not found' });
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
      console.error('Error getting owner By ID:', err);
      res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
  }

  const searchOwners = (req, res) => {
    const { page = 1, limit = 20, search = "" } = req.query;
    let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    ownerModel.searchOwners(pageNum, limitNum, search, (err, data) => {
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'owners',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting owners:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }


  const deleteOwner = (req, res) => {
    const ownerId = req.params.ownerID;
    ownerModel.deleteOwner(ownerId, (err, result) => {
      if (err) {
        console.error('Error Deleting owner by ID:', err);
        res.status(500).send('Internal Server Error');
      } else {
        res.json({ status: 'success', message: 'Executed Successfully' });
      }
    })
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

module.exports = ownerController