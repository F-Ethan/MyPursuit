import { useState, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonTitle,
  IonButton,
} from "@ionic/react";
import "./NewStock.css";

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

const NewStock: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default NewStock;
