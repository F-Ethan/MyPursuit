import { combineReducers } from "@reduxjs/toolkit";
import { UielReducer } from "./uiel";

const rootReducer = combineReducers({
  uiel: UielReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
