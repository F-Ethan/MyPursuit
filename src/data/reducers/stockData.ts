import { createReducer } from "@reduxjs/toolkit";
import { setStockData } from "../actions/stockData";

const rawStockData = {
  StockData: {
    symbol: null,
    marketOpen: null,
    marketClose: null,
    sharesShort: null,
    totalCash: null,
    marketCap: null,
    revenue: null,
    dividendsPerShare: null,
  },
  userStockData: {
    symbol: null,
    toHighPrice: null,
    highPrice: null,
    lowPrice: null,
    toLowPrice: null,
  },
};

export const StockDataReducer = createReducer(
  { rawStockData },
  {
    [setStockData.type]: (state, action) => ({
      ...state,
      rawStockData: { ...action.payload },
    }),
  }
);
