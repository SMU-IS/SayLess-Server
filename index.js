const mongoose = require('mongoose');
const app = require('./app');
const config = require('./src/config/config');
let server;

mongoose.connect(config.mongoose.url,
  ).then(()=>{
    console.log('Connected to MongoDB')
    server = app.listen(config.port, () => {
      console.log(`Listening to port ${config.port}`)
      // logger.info(`Listening to port ${config.port}`);
    });
});;

const exitHandler = () => {
  if (server) {
    server.close(() => {
      // logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // logger.error(error);
  console.log(error)
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  // logger.info('SIGTERM received');
  console.log("SIGTERM received")
  if (server) {
    server.close();
  }
});