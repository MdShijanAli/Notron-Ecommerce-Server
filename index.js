const express = require('express');
// const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 3000;
const routes = require('./routes/routes');

app.use(cors()); // Enable CORS for all routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

