import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonBadge, IonList, IonText, IonAvatar, IonThumbnail, IonButton, IonIcon, IonDatetime, IonSelect, IonSelectOption, IonToggle, IonInput, IonCheckbox, IonRange, IonNote } from '@ionic/react';
import { closeCircle, home, star, navigate, informationCircle, checkmarkCircle, shuffle, thumbsUpOutline, arrowUp, arrowDown,  } from 'ionicons/icons';



interface listItems {
  Symbol: string;
  Marketcap: string;
  Action: String;
  Color: String,

}

interface Props {
    Stock: string;
    i: number;
}

let Actions: Array<string> = ['Buy', 'Sell', 'Hold'];


const StockOverview: React.FC<Props> = ({Stock, i}) => {

    const [ listItems, setListItems ] = useState<any>([]);



      React.useEffect(() => {
      sendRequest().then((data: any) => {
              setListItems(data)
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
        method: 'GET',
        url: 'http://localhost:3000/',
        params: {symbol: Stock},
       
      };


      const sendRequest = () => {
      console.log("Sending Get request")
      return axios.request(options).then((response: any) => {
      return response.data[0];
      })
      };


    var axios = require("axios").default;

    console.log(Stock, listItems);

  return (
 
        
       <div className='row'> 
        <IonItem key={i}>
          <IonBadge color={listItems.Color}>
            {listItems.Action}
          </IonBadge>
          {/* <ion-icon name="thumbs-up-sharp"></ion-icon> */}
          <IonIcon icon={arrowUp} />
          <IonLabel > {listItems.Symbol} </IonLabel>
          <IonItem slot="end">
          ${listItems.Marketcap}
          </IonItem>
        </IonItem>
      </div>
  );
};

export default StockOverview;