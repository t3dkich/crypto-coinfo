import { CoinInfo } from "./CoinInfo";

export interface CoinInfoResponseObject {
  data: Array<CoinInfo>;
  timestamp: number;
}
