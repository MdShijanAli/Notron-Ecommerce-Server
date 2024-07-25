const salesMansModel = require('../models/salesMansModel')();
const formatResultData = require("../utils/formatResultsData");

function salesMansController() {

  const createSalesMans = (req, res) => {
    const salesMansData = req.body;
    salesMansModel.createSalesMans(salesMansData, (err, result)=>{
      if (err) {
        console.error('Error Creating salesMans:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const salesMansId = result.insertId;
        salesMansModel.getSalesMansById(salesMansId, (err, result) => {
          if (err) {
            console.error('Error getting salesMans by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editSalesMans = (req, res) => {
    const salesMansData = req.body;
    const salesMansId = req.params.salesMansID
    salesMansModel.editSalesMans(salesMansData, salesMansId, (err, result)=>{
      if (err) {
        console.error('Error Updating salesMans:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        salesMansModel.getSalesMansById(salesMansId, (err, result) => {
          if (err) {
            console.error('Error getting salesMans by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllSalesMans = (req, res) => {
    const {page =  1, limit = 20, sort_by = 'created_at', sort_order = 'DESC'} = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const sortOrder = sort_order.toUpperCase()
    salesMansModel.getAllSalesMans(pageNum, limitNum, sort_by, sortOrder, (err, data)=>{
      try {

        const { results, total } = data;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'sales_mans',
          result: results,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting salesMans:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }


  const getSalesMansById = (req, res) => {
    const salesMansId = req.params.salesMansID;
    try{
    salesMansModel.getSalesMansById(salesMansId, (err, result)=>{
      if (err) {
        console.error('Error getting salesMans by ID:', err);
        res.status(404).json({ status: 'Bad Request', message: 'salesMans not found' });
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
    console.error('Error getting salesMans By ID:', err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

const searchSalesMans = (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    salesMansModel.searchSalesMans(pageNum, limitNum, search, async (err, result) => {
      try {

        const total = result?.length;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'salesMans',
          result: result,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting salesMans:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }


const deleteSalesMans = (req, res) =>{
  const salesMansId = req.params.salesMansID;
  salesMansModel.deleteSalesMans(salesMansId, (err, result)=>{
    if (err) {
      console.error('Error Deleting salesMans by ID:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ status: 'success', message: 'Executed Successfully' });
    }
  })
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

module.exports = salesMansController