import React from 'react';
import { IonContent, IonHeader, IonPage, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/react';
import StockOverview from './StockOverview';

interface ContainerProps {
  name: string;
}

// , 'ARKK', 'LMND', 'FUV', "FL","ETH-USD", "DJI", "GSPC", "CARG", "IXIC", "RH", "CLF", "ISPO", "ABBV", "XRP-USD", "SE", "CM.TO", "REGI", "X", "ALF", "JNJ", "ZOM", "BTE.TO", "MULN", "FCX", "NUE", "CYDY", "XRP-CAD", "NKE", "TAL", "LMT", "WTRH"
let StockInfo: Array<string> = ['TSLA'];


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
     return(
      <div className="container">
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
      </IonCardContent>
        </IonCard>
      <strong>{name}</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
    
    )
    
};

export default ExploreContainer;

