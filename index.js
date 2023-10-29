const mongoose = require("mongoose");
const app = require("./app");
const messageServer = require("./src/routes/message.route");
const config = require("./src/config/config");
// const fs = require("fs");
// const https = require("https");
let server;
let socketServer;

// // HTTPS configuration
// const privateKey = fs.readFileSync("path/to/your/private-key.pem", "utf8");
// const certificate = fs.readFileSync("path/to/your/certificate.pem", "utf8");
// const credentials = { key: privateKey, cert: certificate };
// const httpsServer = https.createServer(credentials, app);

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(config.port, "0.0.0.0", () => {
    console.log(`Listening to port ${config.port}`);
    // logger.info(`Listening to port ${config.port}`);
  });
  // socketServer = messageServer.listen(8887, "0.0.0.0", () => {
  //   console.log("listening on *:8887");
  // });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      if (socketServer) {
        socketServer.close(() => {
          console.log("Socket server closed");
          process.exit(1); // Exit with a success code
        });
      } else {
        process.exit(1); // No socket server to close, just exit with a success code
      }
    });
  } else {
    if (socketServer) {
      socketServer.close(() => {
        console.log("Socket server closed");
        process.exit(1); // Exit with a success code
      });
    } else {
      process.exit(1); // No server or socket server to close, just exit with a success code
    }
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.log("SIGTERM received");
  process.exit(0);
  // exitHandler();
});

process.on("SIGINT", () => {
  console.log("Ctrl+C (SIGINT) received");
  process.exit(0);
  // exitHandler();
});
