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

import "./MyStocks.css";

import { rawStockData } from "../interfaces/stockData";

interface stockInfo extends Array<rawStockData> {}

const MyStocks: React.FC = (props: any) => {
  // variables to set and store rawStockData object returned from the server
  const [stockInfo, setstockInfo] = useState<any>([]);

  // opens and closes the NewStock Modal
  const [present, dismiss] = useIonModal(NewStock, {
    dismiss: () => props.dispatch({ toggleNewStockForm: false }),
  });

  //New Stock Modal options
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [0, 0.2, 0.5, 1],
    initialBreakpoint: 0.5,
    backdropBreakpoint: 0.2,
    swipeToClose: true,
    componentProps: dismiss,
  };

  // when DOM is updated useEffect sends request to server to get stock data
  useEffect(() => {
    // setTimeout(() => props.dispatch(setLoader({ isLoading: true })), 2000);

    sendRequest().then((data: any) => {
      setstockInfo(data);
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
  console.log(stockInfo);

  return (
    <IonPage>
      {props.isLoading ? (
        <div>
          <p>The page is loading... Please wait.</p>
        </div>
      ) : (
        <IonContent>
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

            {stockInfo.map((stock: any, i: number) => {
              return (
                <span key={i}>
                  <StockOverview stock={stock} i={i} />
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
}))(MyStocks);
