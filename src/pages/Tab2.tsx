import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import StockOverview from '../components/StockOverview';

import './Tab2.css';


interface ContainerProps {
  name: string;
}

let StockInfo: Array<string> = ['TSLA' 
, 'ARKK', 'LMND', 'FUV', "FL","ETH-USD", "DJI", "GSPC", "CARG", "IXIC", "RH", "CLF", "ISPO", "ABBV", "XRP-USD", "SE", "CM.TO", "REGI", "X", "ALF", "JNJ", "ZOM", "BTE.TO", "MULN", "FCX", "NUE", "CYDY", "XRP-CAD", "NKE", "TAL", "LMT", "WTRH"
];
const Tab2: React.FC = () => {
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
          
          {StockInfo.map((stock, i) => {
            return(
              <StockOverview Stock={stock} i={i} /> 
            )
            })}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
