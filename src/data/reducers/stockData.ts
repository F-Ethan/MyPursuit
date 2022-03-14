import { createReducer } from "@reduxjs/toolkit";
import { setStockData } from "../actions/stockData";

// const rawStockData: Array<any> = [];

const rawStockData = [
  {
    stockData: {
      symbol: "null",
      marketOpen: 0,
      marketClose: 0,
      sharesShort: 0,
      totalCash: 0,
      marketCap: 0,
      revenue: 0,
      dividendsPerShare: 0,
    },
    userStockData: {
      symbol: "null",
      toHighPrice: 0,
      highPrice: 0,
      lowPrice: 0,
      toLowPrice: 0,
    },
  },
];

export const stockDataReducer = createReducer([rawStockData], {
  [setStockData.type]: (state, action) => ({
    ...state,
    rawStockData: action.payload,
  }),
});
