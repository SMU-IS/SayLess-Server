const express = require("express");
const router = express.Router();
const axios = require("axios");

// Supercook api connect
router.post("/search-recipe", (req, res) => {
  const requestData = req.body;
  // Process the data
  const checkField = "ingredient";
  if (checkField in requestData) {
    const kitchenItems = requestData[checkField].join(",");
    const queryParams = {
      needsimage: 1,
      app: 1,
      kitchen: kitchenItems,
      focus: "",
      exclude: "",
      kw: "",
      catname: "",
      start: 0,
      fave: false,
      lang: "en",
      cv: 2,
    };
    axios
      .post("https://d1.supercook.com/dyn/results", "", {
        params: queryParams,
      })
      .then((response) => {
        // console.log('Response:', response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.json(error);
      });
  } else {
    res.status(404).send("Resource not found");
  }
  // console.log('Received data:', requestData);
});

router.post("/get-recipe", (req, res) => {
  const requestData = req.body;
  const checkField = "rid";
  if (checkField in requestData) {
    console.log(requestData[checkField]);
    let queryParams = {
      rid: requestData[checkField],
      lang: "en",
      // 'ingredients': 'egg%2Csugar%2Cbutter'
    };
    axios
      .post("https://d1.supercook.com/dyn/details", "", {
        params: queryParams,
      })
      .then((response) => {
        // console.log('Response:', response.data);
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        res.json(error);
      });
  } else {
    res.status(404).send("Resource not found");
  }
});

module.exports = router;
