import { createReducer } from "@reduxjs/toolkit";
import { setStockData } from "../actions/stockData";

const rawStockData: any = null;

// const rawStockData = [
//   {
//     stockData: {
//       symbol: "null",
//       marketOpen: 0,
//       marketClose: 0,
//       sharesShort: 0,
//       totalCash: 0,
//       marketCap: 0,
//       revenue: 0,
//       dividendsPerShare: 0,
//     },
//     userStockData: {
//       symbol: "null",
//       toHighPrice: 0,
//       highPrice: 0,
//       lowPrice: 0,
//       toLowPrice: 0,
//     },
//   },
// ];

// Adds incoming stockData to store
// Takes in a array of objects
const ADDSTOCKDATA = (state: any[], action: any) => {
  let newState = [];
  //   console.log("state[0]");
  //   console.log(state[0]);
  if (state[0] !== null) {
    newState.push(...state);
  }
  newState.push(Object.values(action.payload));
  //   console.log("new state has been set");
  //   console.log(newState);

  return newState;
};

export const stockDataReducer = createReducer([rawStockData], {
  [setStockData.type]: ADDSTOCKDATA,
});
