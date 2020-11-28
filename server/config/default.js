module.exports = {
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
