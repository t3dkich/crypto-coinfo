import numeral from "numeral";
const {
  rank,
  priceUsd,
  marketCapUsd,
  vwap24Hr,
  maxSupply,
  volumeUsd24Hr,
  changePercent24Hr,
} = {
  rank: "rank",
  name: "name",
  priceUsd: "priceUsd",
  marketCapUsd: "marketCapUsd",
  vwap24Hr: "vwap24Hr",
  maxSupply: "maxSupply",
  volumeUsd24Hr: "volumeUsd24Hr",
  changePercent24Hr: "changePercent24Hr",
  id: "id",
  supply: "supply",
  symbol: "symbol",
};
const formatCoinInfo = (coinsInfo) => {
  if (!coinsInfo) return;
  let val;
  coinsInfo.forEach((coin) => {
    for (const key in coin) {
      if (key === rank) continue;
      val = coin[key];
      coin[key] = format(val, key);
    }
  });
  return coinsInfo;
};

const format = (val, key) => {
  return !isNaN(+val) ? formatIner(val, key) : val;
};

const formatIner = (numberTxt, key) => {
  let number = +numberTxt;
  let final;
  let format;
  if (
    key === priceUsd ||
    key === marketCapUsd ||
    key === vwap24Hr ||
    key === maxSupply ||
    key === volumeUsd24Hr
  ) {
    format = "$";
  } else if (key === changePercent24Hr) {
    format = "0,0.00";
    final = numeral(number).format(format);
    return final.concat("%");
  }
  if (number < 1 && number > -1) {
    format += "0,0.00000000";
  } else if (number % 10 === 0) {
    format += "0,0";
  } else {
    format += "0,0.00";
  }
  final = numeral(number).format(format);
  return final;
};

export default formatCoinInfo;
