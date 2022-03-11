import { createAction } from "@reduxjs/toolkit";

interface Loader {
  isLoading: boolean;
}

interface Alert {
  isVisible: boolean;
  message: string;
}

interface newStockForm {
  isVisable: boolean;
}

export const setLoader = createAction(
  "LOADER",
  function prepare(loader: Loader) {
    return {
      payload: loader,
    };
  }
);

export const toggleNewStockForm = createAction(
  "NEWSTOCKFORM",
  function prepare(newStockForm: newStockForm) {
    return {
      payload: newStockForm,
    };
  }
);

export const setAlert = createAction("ALERT", function prepare(alert: Alert) {
  return {
    payload: alert,
  };
});
