const mongoose = require("mongoose");
const app = require("./app");
const messageServer = require("./src/routes/message.route");
const config = require("./src/config/config");
let server;

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
    // logger.info(`Listening to port ${config.port}`);
  });
  socketServer = messageServer.listen(8887, () => {
    console.log("listening on *:8887");
  });
});

const exitHandler = () => {
  if (server || socketServer) {
    socketServer.close();
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  // logger.error(error);
  console.log(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  // logger.info('SIGTERM received');
  console.log("SIGTERM received");
  if (server) {
    server.close();
  }
});
