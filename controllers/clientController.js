const clientModel = require('../models/clientModel')();
const formatResultData = require("../utils/formatResultsData");

function clientController() {

  const createClient = (req, res) => {
    const clientData = req.body;
    clientModel.createClient(clientData, (err, result)=>{
      if (err) {
        console.error('Error Creating clients:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        const clientId = result.insertId;
        clientModel.getClientById(clientId, (err, result) => {
          if (err) {
            console.error('Error getting client by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const editClient = (req, res) => {
    const clientData = req.body;
    const clientId = req.params.clientID
    clientModel.editClient(clientData, clientId, (err, result)=>{
      if (err) {
        console.error('Error Updating clients:', err);
        res.status(500).send('Internal Server Error');
      }
      else {
        clientModel.getClientById(clientId, (err, result) => {
          if (err) {
            console.error('Error getting client by ID:', err);
            res.status(500).send('Internal Server Error');
          } else {
            res.json({ status: 'success', message: 'Executed Successfully', data: result.length > 0 ? result[0] : null });
          }
        });
      }
    })
  }

  const getAllClients = (req, res) => {
    const {page =  1, limit = 20} = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    clientModel.getAllClients(pageNum, limitNum, (err, result)=>{
      try {

        const total = result?.length;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'clients',
          result: result,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting clients:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }
    })
  }


  const getClientById = (req, res) => {
    const clientId = req.params.clientID;
    try{
    clientModel.getClientById(clientId, (err, result)=>{
      if (err) {
        console.error('Error getting client by ID:', err);
        res.status(404).json({ status: 'Bad Request', message: 'client not found' });
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
    console.error('Error getting client By ID:', err);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
}

const searchClients = (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  let pageNum = parseInt(page);
    let limitNum = parseInt(limit);
    clientModel.searchClients(pageNum, limitNum, search, async (err, result) => {
      try {

        const total = result?.length;

        formatResultData({
          res,
          total,
          limitNum,
          pageNum,
          apiEndPoint: 'clients',
          result: result,
          totalResults: total
        })

      } catch (err) {
        console.error('Error getting clients:', err);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
      }

    })

  }


const deleteClient = (req, res) =>{
  const clientId = req.params.clientID;
  clientModel.deleteClient(clientId, (err, result)=>{
    if (err) {
      console.error('Error Deleting client by ID:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json({ status: 'success', message: 'Executed Successfully' });
    }
  })
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

module.exports = clientController