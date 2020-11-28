import fetch from "node-fetch";
import { CoinInfoResponseObject } from "../interfaces/CoinInfoResponseObject";

const url: string = "https://api.coincap.io/v2";
const urlAssets: string = "assets";

const isNumberInt = (n: string) => {
  return !isNaN(parseInt(n)) && !isNaN(parseInt(n) - 0);
};

const MAXLIMIT_ASSETS: number = 2000;
const isRanged = (n: number) => {
  return n > 0 && n <= MAXLIMIT_ASSETS;
};

const fetcher = async (...parts: string[]): Promise<Object> => {
  let endpoint: string = parts.join("/");
  const response = await fetch(url + "/" + endpoint, {
    method: "GET",
    redirect: "follow",
  });

  if (response.status !== 200) {
    return response.statusText;
  }

  return await response.json();
};

const assetsList = async (limit: number): Promise<CoinInfoResponseObject> => {
  let urlLimit = limit ? "?limit=" + limit : "";

  return (await fetcher(
    urlAssets + urlLimit
  )) as Promise<CoinInfoResponseObject>;
};

const getDataCoinCapServices = (() => {
  return {
    assetsList,
    fetcher,
  };
})();

export default getDataCoinCapServices;
