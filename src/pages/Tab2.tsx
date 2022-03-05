import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import StockOverview from '../components/StockOverview';

import './Tab2.css';



interface listItems {
  symbol: string;
  marketOpen: number;
  marketClose: number;
  sharesShort: number;
  totalCash: number;
  marketCap: number;
  revenue: number;
  dividendsPerShare: number;
}

interface stockInfo extends Array<listItems>{}; 

interface ContainerProps {
  name: string;
}

// let StockInfo: Array<string> = ['TSLA' 
// , 'ARKK', 'LMND', 'FUV', "FL","ETH-USD", "DJI", "GSPC", "CARG", "IXIC", "RH", "CLF", "ISPO", "ABBV", "XRP-USD", "SE", "CM.TO", "REGI", "X", "ALF", "JNJ", "ZOM", "BTE.TO", "MULN", "FCX", "NUE", "CYDY", "XRP-CAD", "NKE", "TAL", "LMT", "WTRH"
// ];
// let Stockssssss: Array<string> = ["TSLA", 'AMD', "FUV"]

const Tab2: React.FC = () => {
  const [ stockInfo, setstockInfo ] = useState<any>([]);



      useEffect(() => {
      sendRequest().then((data: any) => {
              setstockInfo(data)
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
        params: {stocks: ["TSLA", 'AMD', "FUV"]},
       
      };


      const sendRequest = () => {
      console.log("Sending Get request")
      return axios.request(options).then((response: any) => {
      return response.data;
      })
      };


    var axios = require("axios").default;
    console.log(stockInfo);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Overview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Overview</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/*-- Default Item --*/}
          
          {
          stockInfo.map((stock: any, i: number) => {
            return(
              <StockOverview stock={stock} i={i} /> 
            )
            })  
          
            }
            
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;














    