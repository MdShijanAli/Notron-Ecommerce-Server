const managerModel = require('../models/managerModel')();
const formatResultData = require("../utils/formatResultsData");

function managerController() {

  const createManager = (req, res) => {
    const managerData = req.body;
    managerModel.createManager(managerData, (err, result)=>{
      if (err) {
        console.error('Error Creating managers:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const managerId = result.insertId;
        managerModel.getManagerById(managerId, (err, result) => {
          if (err) {
            console.error('Error getting manager by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editManager = (req, res) => {
    const managerData = req.body;
    const managerId = req.params.managerID
    managerModel.editManager(managerData, managerId, (err, result)=>{
      if (err) {
        console.error('Error Updating managers:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        managerModel.getManagerById(managerId, (err, result) => {
          if (err) {
            console.error('Error getting manager by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllManagers = (req, res) => {
    const {page =  1, limit = 20, sort_by = 'created_at', sort_order = 'DESC'} = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    managerModel.getAllManagers(pageNum, limitNum, sort_by, sortOrder, (err, data)=>{
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'managers',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting managers:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }


  const getManagerById = (req, res) => {
    const managerId = req.params.managerID;
    try{
    managerModel.getManagerById(managerId, (err, result)=>{
      if (err) {
        console.error('Error getting manager by ID:', err);
        res.status(404).json({ status: 'Bad Request', message: 'manager not found' });
      } else {
        res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? 
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
          : null })
      }
    });
  }
  catch (err) {
    console.error('Error getting manager By ID:', err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

const searchManagers = (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    managerModel.searchManagers(pageNum, limitNum, search, async (err, result) => {
      try {

        const total = result?.length;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'managers',
          result: result,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting managers:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }


const deleteManager = (req, res) =>{
  const managerId = req.params.managerID;
  managerModel.deleteManager(managerId, (err, result)=>{
    if (err) {
      console.error('Error Deleting manager by ID:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ status: 'success', message: 'Executed Successfully' });
    }
  })
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

module.exports = managerController