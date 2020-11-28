module.exports = {
  db: {
    CONNECTION_STRING: "mongodb://localhost:27017/local",
  },
  server: {
    PORT: 3001,
    TIMEOUT: 5 * 1000, //seconds
  },
  apiCoinCap: {
    LIMIT_ASSETS: 30,
  },
  socket: {
    EVENT: {
      getData: "getData",
    },
  },
};
