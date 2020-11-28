import cors from "cors";
import dbConnection from "./db/mongoConnection";
import dbTransactions from "./db/controllers/dbTransactions";
import socket from "./services/socket";
import dbFill from "./services/dbFill";

const {
  addCoinsInfo,
  delCoinsInfo,
  getCoinsInfo,
  updateCoinsInfo,
} = dbTransactions;

const { init, getNewCoinsInfo } = dbFill;

export default (setts: any) => {
  const app = require("express")();
  app.use(cors());
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);
  socket(io, getCoinsInfo, setts);

  server.listen(setts.server.PORT, () => {
    console.log("Node Server on port " + setts.server.PORT);
    dbConnection(setts);
    init(setts, delCoinsInfo, addCoinsInfo);
    setInterval(() => {
      getNewCoinsInfo(setts, updateCoinsInfo);
    }, setts.server.TIMEOUT);
  });
};
