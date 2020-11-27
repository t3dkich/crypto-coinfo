import express, { Application, Request, Response } from "express";
import dbConnection from "./db/mongoConnection";
import dbTransactions from "./db/controllers/dbTransactions";
import getDataCoinCapServices from "./services/getDataCoinCapServices";
import { CoinInfoResponseObject } from "./interfaces/CoinInfoResponseObject";
import { Socket } from "socket.io";
import cors from "cors";

const PORT = 3001;
const TIMEOUT = 10000;
const EVENT_GetData = "getData";
const LIMIT_ASSETS = 30;
const app = require("express")();
app.use(cors());
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { assetsList } = getDataCoinCapServices;
const {
  addCoinsInfo,
  delCoinsInfo,
  getCoinsInfo,
  updateCoinsInfo,
} = dbTransactions;

const emitData = async (socket: Socket) => {
  console.log("emitDAta -> IN");

  let info = await getCoinsInfo();
  socket.emit(EVENT_GetData, info);
};

let interval: NodeJS.Timeout;

io.on("connection", async (socket: Socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  setTimeout(() => {
    emitData(socket);
    interval = setInterval(() => emitData(socket), TIMEOUT);
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  }, 300);
});

const init_FillDB = async () => {
  const info: CoinInfoResponseObject = await assetsList(LIMIT_ASSETS);
  delCoinsInfo();
  addCoinsInfo(info);
};

const getCoinsInfo_FillDB = async () => {
  const info: CoinInfoResponseObject = await assetsList(LIMIT_ASSETS);
  updateCoinsInfo(info);
};

server.listen(PORT, () => {
  console.log("Node Server on port " + PORT);
  dbConnection();
  init_FillDB();
  setInterval(() => {
    getCoinsInfo_FillDB();
  }, TIMEOUT);
});
