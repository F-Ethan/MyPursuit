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
  IonIcon,
} from "@ionic/react";
import { helpCircleOutline } from "ionicons/icons";
import "./NewStock.css";

import { connect } from "react-redux";
import { toggleNewStockForm } from "../data/actions/uiel";

export interface newStockInfo {
  symbol: string;
  marketOpen: number;
  marketClose: number;
  sharesShort: number;
  totalCash: number;
  marketCap: number;
  revenue: number;
  dividendsPerShare: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  twoHundredDayAverage: number;
}

const NewStock: React.FC<{
  count: number;
  onDismiss: () => void;
}> = ({ count, onDismiss }) => {
  const [text, setText] = useState<string>();
  const [upperLimit, setUpperLimit] = useState<any>();
  const [baisline, setBaisline] = useState<any>();
  const [lowerLimit, setLowerLimit] = useState<any>();
  const [newStockInfo, setNewStockInfo] = useState<any>([]);
  const [stockSelect, setStockSelect] = useState<boolean>(false);

  const fetchNewStock = () => {
    console.log("sending the axios request");
    sendRequest().then((data: any) => {
      //---- this block runs after recieving a response from the back end  ----
      //set the response Object to newStockInfo
      setNewStockInfo(data);
      //Change stockSelect to true
      setStockSelect(true);
      //set the needed data to thier respective useState hooks for the form
      setUpperLimit(data.fiftyTwoWeekHigh);
      setLowerLimit(data.fiftyTwoWeekLow);
      setBaisline(data.twoHundredDayAverage);
    });
  };

  var addUserStockInfoOptions = {
    method: "POST",
    url: "http://localhost:3000/user/newStock",
    params: {
      username: "Fethanerrier",
      stockInfo: {
        upperLimit,
        baisline,
        lowerLimit,
      },
    },
  };

  const sendStockInfo = () => {
    console.log("Pushing stock Info data to backend");
    return axios.request(addUserStockInfoOptions).then((response: any) => {
      console.log(response.data);
      return response.data;
    });
  };

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
          <IonButton color="danger" fill="outline" onClick={() => onDismiss()}>
            X
          </IonButton>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>{newStockInfo.symbol}</IonCardTitle>
            </IonCardHeader>
            <IonItem>
              <IonLabel>Upper Limit</IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => setUpperLimit(e.detail.value!)}
                value={upperLimit}
              ></IonInput>
              <IonIcon icon={helpCircleOutline} />
            </IonItem>
            <IonItem>
              <IonLabel>Baisline </IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => setBaisline(e.detail.value!)}
                value={baisline}
              ></IonInput>
              <IonIcon icon={helpCircleOutline} />
            </IonItem>
            <IonItem>
              <IonLabel>Lower Limit</IonLabel>
              <IonInput
                type="number"
                onIonChange={(e) => setLowerLimit(e.detail.value!)}
                value={lowerLimit}
              ></IonInput>
              <IonIcon icon={helpCircleOutline} />
            </IonItem>
            <IonButton
              color="success"
              fill="outline"
              onClick={() => sendStockInfo()}
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
  stockData: props.stockData,
}))(NewStock);
