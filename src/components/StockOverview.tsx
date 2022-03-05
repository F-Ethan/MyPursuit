import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonBadge, IonList, IonText, IonAvatar, IonThumbnail, IonButton, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonToggle, IonInput, IonCheckbox, IonRange, IonNote } from '@ionic/react';
import { closeCircle, home, star, navigate, informationCircle, checkmarkCircle, shuffle, thumbsUpOutline, arrowUp, arrowDown,  } from 'ionicons/icons';

interface Props {
    stock: {
      symbol: string;
      marketOpen: number;
      marketClose: number;
      sharesShort: number;
      totalCash: number;
      marketCap: number;
      revenue: number;
      dividendsPerShare: number;
    };
    i: number;
}

let Actions: Array<string> = ['Buy', 'Sell', 'Hold'];


const StockOverview: React.FC<Props> = ({stock, i}) => {

// nFormatter is a funcion used to take a large Number(num) and a digits variable. the 
// digits variable (0 or 1) decieds if you want a decimal piont or not
  function nFormatter(num: number, digits: number) {
    const lookup = [  
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  // change the large numbers form the stock data into understanable numbers, eg 126B 
  let formattedMarketCap = nFormatter(stock.marketCap, 0)
  let formattedRevenue = nFormatter(stock.revenue, 0)


    return (
 
        
       <div className='row' key={stock.symbol}> 
        <IonItem >
          {/* <IonBadge color={stock.Color}> */}
          <IonBadge>
            {formattedRevenue}
          </IonBadge>
          {/* <ion-icon name="thumbs-up-sharp"></ion-icon> */}
          {/* <IonIcon icon={arrowUp} /> */}
          <IonLabel class="ion-margin-start"> {stock.symbol} </IonLabel>
          <IonItem slot="end">
          ${formattedMarketCap}
          </IonItem>
        </IonItem>
      </div>
  );
};

export default StockOverview;