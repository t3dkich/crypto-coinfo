// rank: "1"
// name: "Bitcoin"
// priceUsd: "16913.3757279158525175"
// marketCapUsd: "313500294417.5133763050312525"
// vwap24Hr: "17021.3725171738134742"
// maxSupply: "21000000.0000000000000000"
// volumeUsd24Hr: "12361211306.4722896232531540"
//   changePercent24Hr: "-2.2339692684575355"
// id: "bitcoin"
// supply: "18535643.0000000000000000"
// symbol: "BTC"
import numeral from "numeral";
const formatCoinInfo = (coinsInfo) => {
  if (!coinsInfo) return;
  let val;
  coinsInfo.forEach((coin) => {
    for (const key in coin) {
      if (key === "rank") continue;
      val = coin[key];
      coin[key] = format(val);
    }
  });
  return coinsInfo;
};

const format = (val) => {
  return !isNaN(+val) ? formatIner(val) : val;
};

const formatIner = (numberTxt) => {
  let number = +numberTxt;
  let string;
  //   console.log("formatInner");
  if (number < 1 && number > -1) {
    number = numeral(number);
    string = number.format("0.00000000");
    // console.log(string);
    return string;
  }
  //   console.log(number);
  if (number % 10 === 0) return numeral(number).format("0");
  string = numeral(number).format("0.00");
  return string;
};

export default formatCoinInfo;
