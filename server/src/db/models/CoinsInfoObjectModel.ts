import mongoose from "mongoose";

export const CoinsInfoObjectSchema = new mongoose.Schema({
  data: [
    {
      id: { type: String },
      rank: { type: String },
      symbol: { type: String },
      name: { type: String },
      supply: { type: String },
      maxSupply: { type: String },
      marketCapUsd: { type: String },
      volumeUsd24Hr: { type: String },
      priceUsd: { type: String },
      changePercent24Hr: { type: String },
      vwap24Hr: { type: String },
    },
  ],
  timestamp: { type: Number },
});

export default mongoose.model("CoinsInfoObject", CoinsInfoObjectSchema);
