const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors()); // Enable CORS for all routes


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'notron_ecommerce',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});





app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result)
  })
})

app.get('/api/blogs', (req, res) => {
  const query = 'SELECT * FROM blogs';

  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error executing the query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(result)
  })
})


// get reviews
app.get('/api/reviews/:productID', (req, res) => {
 
  const productID = req.params.productID

  const query = 'SELECT * from reviews WHERE product_id = ?'

  connection.query(query, [productID], (err, results) => {
        if (err) {
      console.error('Error executing SQL query: ', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(results);
    }
  });
});


app.get('/', (req, res) => {
  res.send('Notron Ecommerce Website Server Api Running')
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

