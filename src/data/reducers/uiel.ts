import { createReducer } from "@reduxjs/toolkit";
import { setLoader, setAlert, toggleNewStockForm } from "../actions/uiel";

const loader = {
  isLoading: false,
};
const NewStockForm = {
  isVisable: false,
};
const alert = {
  isVisible: false,
  message: "",
};

export const UielReducer = createReducer(
  { loader, NewStockForm, alert },
  {
    [setLoader.type]: (state, action) => ({
      ...state,
      loader: { ...action.payload },
    }),
    [toggleNewStockForm.type]: (state, action) => ({
      ...state,
      NewStockForm: { ...action.payload },
    }),
    [setAlert.type]: (state, action) => ({
      ...state,
      alert: { ...action.payload },
    }),
  }
);
