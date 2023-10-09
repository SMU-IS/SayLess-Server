// index.js (or app.js)
require("./config");
const fs = require('fs');
const https = require('https');
const express = require('express');
const app = express();
const port = 3000; // You can use any port you prefer
const apiRoutes = require('./src/routes/api'); // Import your API routes
const bodyParser = require('body-parser'); // Import body-parser
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes); // Use the API routes
module.exports = app;