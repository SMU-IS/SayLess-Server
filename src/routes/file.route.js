const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectId;
const axios = require("axios");
const FormData = require("form-data");

router.get("/scan-receipt", async (req, res) => {
  const base64UtfImage = req.body.image;
  const base64Image = base64UtfImage.replace(
    /^data:image\/[a-zA-Z+]+;base64,/,
    ""
  );

  // Decode the UTF-8 Base64 string into binary data
  const binaryData = Buffer.from(base64Image, "base64");

  // Re-encode the binary data into a regular Base64 string
  const base64EncodedImage = binaryData.toString("base64");
  const formData = new FormData();
  formData.append("show_original_response", "false");
  formData.append("fallback_providers", "");
  formData.append("providers", "google");
  formData.append("language", "en");
  formData.append("file", Buffer.from(base64EncodedImage, "base64"), {
    filename: "image.png", // Specify the filename for the image
  });

  let headers = {
    Authorization: process.env.EDENAI_TOKEN,
    "Content-Type": "multipart/form-data; boundary=" + formData.getBoundary(),
  };
  // Make the POST request using Axios
  axios
    .post("https://api.edenai.run/v2/ocr/receipt_parser", formData, { headers })
    .then((response) => {
      if (response.data.google) {
        res.json(response.data.google.extracted_data); // Send the response to the client
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Request failed"); // Handle errors appropriately
    });
});

module.exports = router;
