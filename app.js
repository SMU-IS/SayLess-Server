// index.js (or app.js)
require("./config");
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser"); // Import body-parser
// CUSTOM IMPORTS
const apiRoutes = require("./src/routes/api"); // Import your API routes
app.use(
  cors({
    origin: "*",
  })
);

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get Cred

app.use("/api", apiRoutes); // Use the API routes
module.exports = app;
