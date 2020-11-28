import { CoinInfoResponseObject } from "../interfaces/CoinInfoResponseObject";
import getDataCoinCapServices from "../services/getDataCoinCapServices";

const { assetsList } = getDataCoinCapServices;
let info: CoinInfoResponseObject;

const init = async (
  setts: any,
  delCoinsInfo: Function,
  addCoinsInfo: Function
) => {
  info = await assetsList(setts.apiCoinCap.LIMIT_ASSETS);
  delCoinsInfo();
  addCoinsInfo(info);
};

const getNewCoinsInfo = async (setts: any, updateCoinsInfo: Function) => {
  info = await assetsList(setts.apiCoinCap.LIMIT_ASSETS);
  updateCoinsInfo(info);
};

export default (() => {
  return {
    init,
    getNewCoinsInfo,
  };
})();
