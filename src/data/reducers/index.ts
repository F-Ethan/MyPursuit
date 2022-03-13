import { combineReducers } from "@reduxjs/toolkit";
import { UielReducer } from "./uiel";
import { stockDataReducer } from "./stockData";

const rootReducer = combineReducers({
  uiel: UielReducer,
  stockData: stockDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
