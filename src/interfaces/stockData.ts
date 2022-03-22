export interface rawStockData {
  stockData: {
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
  };
  userStockData: {
    symbol: string;
    toHighPrice: number;
    highPrice: number;
    lowPrice: number;
    toLowPrice: number;
  };
}
