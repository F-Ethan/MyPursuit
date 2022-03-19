import { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItemDivider,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  useIonModal,
} from "@ionic/react";
import StockOverview from "../components/StockOverview";
import NewStock from "./NewStock";
import { connect } from "react-redux";

import { setLoader, toggleNewStockForm } from "../data/actions/uiel";
import { setStockData } from "../data/actions/stockData";

import "./MyStocks.css";

import { rawStockData } from "../interfaces/stockData";
import store from "../data/store";
import { POINT_CONVERSION_COMPRESSED } from "constants";

interface stockInfo extends Array<rawStockData> {}

const MyStocks: React.FC = (props: any) => {
  // variables to set and store rawStockData object returned from the server
  const [stockInfo, setStockInfo] = useState<any>([]);
  // store.subscribe(() => {
  //   setStockInfo(props.getState().rawStockData);
  // });

  const handelDismiss = () => {
    dismiss();
  };

  // opens and closes the NewStock Modal
  const [present, dismiss] = useIonModal(NewStock, {
    onDismiss: handelDismiss,
    componentProps: handelDismiss,
  });

  //New Stock Modal options
  const modalOptions = {
    breakpoints: [0, 0.2, 0.5, 1],
    initialBreakpoint: 1,
    backdropBreakpoint: 0.2,
    swipeToClose: true,
  };

  const initialStore = (data: any) => {
    console.log("Dispatching stock data");
    console.log(data);
    props.dispatch(setStockData({ ...data }));
  };

  // when DOM is updated useEffect sends request to server to get stock data
  useEffect(() => {
    // setTimeout(() => props.dispatch(setLoader({ isLoading: true })), 2000);

    sendRequest().then(async (data: any) => {
      // setStockInfo(data);

      await initialStore(data);
      props.dispatch(setLoader({ isLoading: false }));
      // data.map((item: any, i: number) => {
      //   console.log("maping itmes to store")
      //   props.dispatch(setStockData(item));
      // });
    });
  }, []);

  // the variables sent to the server to get the stock data
  var options = {
    method: "GET",
    url: "http://localhost:3000/",
    params: { username: "fethanerrier" },
  };

  const sendRequest = () => {
    console.log("Sending Get request");
    return axios.request(options).then((response: any) => {
      return response.data;
    });
  };

  var axios = require("axios").default;
  console.log(props.stockData);

  return (
    <IonPage>
      {props.isLoading ? (
        <div>
          <p>The page is loading... Please wait.</p>
        </div>
      ) : (
        <IonContent>
          {console.log("starting to load page component")}
          {console.log(typeof props.stockData)}
          <IonHeader>
            <IonToolbar>
              <IonTitle slot="start">My Stocks</IonTitle>
              <IonButton
                slot="end"
                class="ion-margin-end"
                color="success"
                fill="outline"
                onClick={() => present(modalOptions)}
              >
                +
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonItemDivider>
            <IonLabel>Actions</IonLabel>
            <IonLabel class="ion-margin-start">Symbol</IonLabel>
            <IonLabel slot="end" class="ion-margin-end">
              Market Cap
            </IonLabel>
          </IonItemDivider>
          <IonList>
            {/*-- Default Item --*/}
            {props.stockData[0].map((stock: any, i: number) => {
              // console.log(arr);
              // if (arr.length < 1) {
              //   console.log(arr);
              // } else {
              //   arr.map((stock: any, i: number) => {
              console.log("sending Stock to StockOverview");
              console.log(stock);
              return (
                <span key={i}>
                  <StockOverview stockInfo={stock} i={i} />
                </span>
              );
            })}
          </IonList>
        </IonContent>
      )}
    </IonPage>
  );
};

// export default MyStocks;
export default connect((props: any) => ({
  isLoading: props.uiel.loader.isLoading,
  isVisable: props.uiel.loader.isVisable,
  stockData: props.stockData,
}))(MyStocks);
