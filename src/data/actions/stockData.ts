import { createAction } from "@reduxjs/toolkit";
import { rawStockData } from "../../interfaces/stockData";

export const setStockData = createAction(
  "SETDATA",
  function prepare(rawStockData: rawStockData) {
    return {
      payload: rawStockData,
    };
  }
);
