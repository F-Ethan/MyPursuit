import { useState } from "react";
// import axios from "axios";
import {
  IonContent,
  IonPage,
  IonCard,
  IonItem,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import "./NewStock.css";

import { connect } from "react-redux";
import { toggleNewStockForm } from "../data/actions/uiel";

import { rawStockData } from "../interfaces/stockData";

interface stockInfo extends Array<rawStockData> {}

const NewStock: React.FC<{
  count: number;
  onDismiss: () => void;
}> = ({ count, onDismiss }) => {
  const [text, setText] = useState<string>();
  const [newStockInfo, setNewStockInfo] = useState<any>([]);
  const [stockSelect, setStockSelect] = useState<boolean>(false);

  const fetchNewStock = () => {
    console.log("sending the axios request");
    sendRequest().then((data: any) => {
      setNewStockInfo(data);
      setStockSelect(true);
    });
  };

  // Yahoo finace API
  // var options = {
  //   method: "GET",
  //   url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
  //   params: { symbol: text, region: "US" },
  //   headers: {
  //     "x-rapidapi-host": "yh-finance.p.rapidapi.com",
  //     "x-rapidapi-key": "63a51f3279msh18e8edbbf2f8ab4p136b71jsnb9c98ca45e18",
  //   },
  // };

  var options = {
    method: "GET",
    url: "http://localhost:3000/newStock",
    params: { symbol: text },
  };

  const sendRequest = () => {
    console.log("Sending Get request");
    return axios.request(options).then((response: any) => {
      console.log(response.data);
      return response.data;
    });
  };

  var axios = require("axios").default;

  console.log();

  if (!stockSelect) {
    return (
      <IonPage>
        <IonContent>
          <IonButton color="danger" fill="outline" onClick={() => onDismiss()}>
            X
          </IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>New Stock</IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonInput
                value={text}
                placeholder="Enter Input"
                onIonChange={(e) => setText(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonButton
              color="success"
              fill="outline"
              onClick={() => fetchNewStock()}
            >
              Submit
            </IonButton>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  } else {
    return (
      <IonPage>
        <IonContent>
          helo
          {/* <IonButton> X</IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {newStockInfo.price.shortName}({newStockInfo.symbol})
              </IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonLabel>Upper Limit</IonLabel>
              <IonInput
                value={newStockInfo.summaryDetail.fiftyTwoWeekHigh.raw}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Baisline </IonLabel>
              <IonInput
                value={newStockInfo.summaryDetail.twoHundredDayAverage.raw}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Lower Limit</IonLabel>
              <IonInput
                value={newStockInfo.summaryDetail.fiftyTwoWeekLow.raw}
              ></IonInput>
            </IonItem>
            <IonButton
              color="success"
              fill="outline"
              onClick={() => fetchNewStock()}
            >
              Submit
            </IonButton>
          </IonCard> */}
        </IonContent>
      </IonPage>
    );
  }
};

// export default NewStock;
export default connect((props: any) => ({
  isVisable: props.uiel.loader.isVisable,
  stockData: props.stockData,
}))(NewStock);
