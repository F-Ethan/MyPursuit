import { createAction } from "@reduxjs/toolkit";
import { rawStockData } from "../../interfaces/stockData";

interface stockInfo extends Array<rawStockData> {}

export const setStockData = createAction(
  "SETDATA",
  function prepare(stockInfo: stockInfo) {
    return {
      payload: stockInfo,
    };
  }
);
