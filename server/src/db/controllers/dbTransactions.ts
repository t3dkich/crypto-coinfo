import { CoinInfoResponseObject } from "../../interfaces/CoinInfoResponseObject";
import CoinsInfoObjectSchema from "../models/CoinsInfoObjectModel";
import { Error, Model } from "mongoose";

let id: any = null;

const addCoinsInfo = async (infos: CoinInfoResponseObject) => {
  const res = await CoinsInfoObjectSchema.create(infos);
  id = res.id;
};

const updateCoinsInfo = async (infos: CoinInfoResponseObject) => {
  await CoinsInfoObjectSchema.findByIdAndUpdate(id, infos);
};

const delCoinsInfo = () => {
  CoinsInfoObjectSchema.deleteMany((err: Error): void | string => {
    if (err) return console.log(err.message);
  });
};

const getCoinsInfo = async () => {
  let res = await CoinsInfoObjectSchema.findById(id);
  return res;
};

const db = (() => {
  return {
    addCoinsInfo,
    delCoinsInfo,
    getCoinsInfo,
    updateCoinsInfo,
  };
})();

export default db;
