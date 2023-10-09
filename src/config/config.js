const dotenv = require('dotenv');

module.exports = {
    port: 3000,
    mongoose: {
      url: "mongodb://localhost:27017/SAYLESS",
      options: {
        useCreateIndex: false,
        useNewUrlParser: false,
        useUnifiedTopology: true,
      },
    },
};