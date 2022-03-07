import { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonList,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import StockOverview from "../components/StockOverview";

import "./Tab2.css";

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

const Tab2: React.FC = () => {
  const [stockInfo, setstockInfo] = useState<any>([]);

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

export default Tab2;
