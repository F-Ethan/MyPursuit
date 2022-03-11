import { useState, useEffect } from "react";
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

import { listItems } from "../interfaces/stockData";

interface Props {
  dismiss: string;
}

interface stockInfo extends Array<listItems> {}

const NewStock: React.FC<Props> = (props: any) => {
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
  var options = {
    method: "GET",
    url: "https://yh-finance.p.rapidapi.com/stock/v2/get-summary",
    params: { symbol: text, region: "US" },
    headers: {
      "x-rapidapi-host": "yh-finance.p.rapidapi.com",
      "x-rapidapi-key": "63a51f3279msh18e8edbbf2f8ab4p136b71jsnb9c98ca45e18",
    },
  };

  const sendRequest = () => {
    console.log("Sending Get request");
    return axios.request(options).then((response: any) => {
      console.log(response.data);
      return response.data;
    });
  };

  var axios = require("axios").default;

  if (!stockSelect) {
    return (
      <IonPage>
        <IonContent>
          <IonButton
            onClick={() => props.dispatch({ toggleNewStockForm: false })}
          >
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
          <IonButton> X</IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                {newStockInfo.price.shortName}({newStockInfo.symbol})
              </IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonLabel>Why so high</IonLabel>
              <IonInput
                value={newStockInfo.summaryDetail.fiftyTwoWeekHigh.raw}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Buy under $</IonLabel>
              <IonInput
                value={newStockInfo.summaryDetail.twoHundredDayAverage.raw}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Why so low</IonLabel>
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
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }
};

// export default NewStock;
export default connect((props: any) => ({
  isVisable: props.uiel.loader.isVisable,
}))(NewStock);
