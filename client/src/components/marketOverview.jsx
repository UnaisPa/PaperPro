import React from 'react';
import { MarketData } from 'react-ts-tradingview-widgets';

const MarketOverview = () => {
  const symbols = ["AAPL", "GOOG", "TSLA"]; // Replace with your symbols
  const widgetOptions = {
    widgetSymbolConfig: { symbols },
    colorTheme: "dark", // Choose from "light", "dark", or "white"
    layout: "horizontal", // Choose from "horizontal" or "vertical" 
    backgroundColor: "#131722",
    // Additional customization options (refer to docs):
    // - frequency: "realtime" or "daily" or "weekly" (default: "realtime")
    // - chartType: "line" or "candlestick" or "area" (default: "line")
    // - range: "1d" or "5d" or "1m" or "3m" or "6m" or "1y" (default: "1d")
    // - showSymbolLogo: true or false (default: true)
    // - ...and many more
  };

  return (
    <MarketData colorTheme='dark'  widgetOptions={widgetOptions} />
  );
};

export default MarketOverview;
