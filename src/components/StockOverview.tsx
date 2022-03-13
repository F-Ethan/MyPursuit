import React from "react";
import { IonItem, IonLabel, IonBadge, IonItemDivider } from "@ionic/react";
import { shuffle, thumbsUpOutline, arrowUp, arrowDown } from "ionicons/icons";

interface Props {
  stockInfo: {
    stockData: {
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
  };
  i: number;
}

let Actions: Array<string> = ["Buy", "Sell", "Hold"];

const StockOverview: React.FC<Props> = ({ stockInfo, i }) => {
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
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  // Deconstruct items for easy uses
  let marketCap = stockInfo.stockData.marketCap;
  let marketOpen = stockInfo.stockData.marketOpen;
  let revenue = stockInfo.stockData.revenue;
  let toHighPrice = stockInfo.userStockData.toHighPrice;
  let highPrice = stockInfo.userStockData.highPrice;
  let lowPrice = stockInfo.userStockData.lowPrice;
  let toLowPrice = stockInfo.userStockData.toLowPrice;
  let action = "";

  // change the large numbers form the stock data into understanable numbers, eg 126B
  let formattedMarketCap = nFormatter(marketCap, 0);
  let formattedRevenue = nFormatter(revenue, 0);
  if (marketOpen >= toHighPrice) {
    action = "danger";
  } else if (marketOpen >= highPrice) {
    action = "warning";
  } else if (marketOpen >= lowPrice) {
    action = "success";
  } else if (marketOpen >= toLowPrice) {
    action = "secondary";
  } else {
    action = "";
  }

  return (
    <IonItem>
      <IonItem color={action}></IonItem>

      {/* <IonBadge color={stock.Color}> */}
      {/* <IonBadge>{formattedRevenue}</IonBadge> */}
      {/* <ion-icon name="thumbs-up-sharp"></ion-icon> */}
      {/* <IonIcon icon={arrowUp} /> */}

      <IonLabel class="ion-margin-start">
        {" "}
        {stockInfo.stockData.symbol}{" "}
      </IonLabel>
      <IonItem slot="end">${formattedMarketCap}</IonItem>
    </IonItem>
  );
};

export default StockOverview;
