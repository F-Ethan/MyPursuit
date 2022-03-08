import { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItemDivider,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  useIonModal,
} from "@ionic/react";
import StockOverview from "../components/StockOverview";
import NewStock from "./NewStock";

import "./MyStocks.css";

interface listItems {
  StockData: {
    symbol: string;
    marketOpen: number;
    marketClose: number;
    sharesShort: number;
    totalCash: number;
    marketCap: number;
    revenue: number;
    dividendsPerShare: number;
  };
  userStockData: {
    symbol: string;
    toHighPrice: number;
    highPrice: number;
    lowPrice: number;
    toLowPrice: number;
  };
}

interface stockInfo extends Array<listItems> {}

interface ContainerProps {
  name: string;
}

const MyStocks: React.FC = () => {
  // variables to set and store listItems object returned from the server
  const [stockInfo, setstockInfo] = useState<any>([]);

  // opens and closes the NewStock Modal
  const [present, dismiss] = useIonModal(NewStock, {
    dismiss: () => dismiss(),
  });

  //New Stock Modal options
  const modalOptions = {
    onDidDismiss: () => dismiss(),
    breakpoints: [0, 0.2, 0.5, 1],
    initialBreakpoint: 0.5,
    backdropBreakpoint: 0.2,
    swipeToClose: true,
  };

  // when DOM is updated useEffect sends request to server to get stock data
  useEffect(() => {
    sendRequest().then((data: any) => {
      setstockInfo(data);
    });
  }, []);

  // Yahoo finace API
  // var options = {
  //   method: 'GET',
  //   url: 'https://yh-finance.p.rapidapi.com/stock/v2/get-summary',
  //   params: {symbol: Stock, region: 'US'},
  //   headers: {
  //     'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
  //     'x-rapidapi-key': '63a51f3279msh18e8edbbf2f8ab4p136b71jsnb9c98ca45e18'
  //   }
  // };

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
            return <StockOverview stock={stock} i={i} />;
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default MyStocks;
