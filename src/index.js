const { httpServer } = require('./app');
const mongoose = require('mongoose');

// DATABASE CONNECTION
const dataBaseConnection = require('./connections/connection');
const majorNodeVersion = +process.env.NODE_VERSION?.split('.')[0] ?? 0;

mongoose.connection.on('connect', () => {
  console.log('Mongodb connected ....');
});

process.on('SIGINT', () => {
  mongoose.connection.once('disconnect', () => {
    console.log('Mongodb disconnected..... ');
    process.exit(0);
  });
});

const startServer = () => {
  httpServer.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
};

if (majorNodeVersion >= 14) {
  try {
    dataBaseConnection();
    startServer();
  } catch (error) {
    console.log(`Mongo db connect error: ${err}`);
  }
} else {
  dataBaseConnection()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      console.log(`Mongo db connect error: ${err}`);
    });
}
