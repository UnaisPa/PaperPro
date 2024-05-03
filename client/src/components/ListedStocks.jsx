import React, { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
    script.async = true;
    script.innerHTML = `
      {
        "width": "100%",
        "height": "100%",
        "symbolsGroups": [
          {
            "name": "Indices",
            "originalName": "Indices",
            "symbols": [
              {
                "name": "NASDAQ:AMZN",
                "displayName": "Amazon"
              },
              {
                "name": "NASDAQ:AAPL",
                "displayName": "Apple Inc"
              },
              {
                "name": "NASDAQ:TSLA",
                "displayName": "Tesla"
              },
              {
                "name": "NASDAQ:MSFT",
                "displayName": "Microsoft"
              },
              {
                "name": "NASDAQ:NVDA",
                "displayName": "Nvidia"
              },
              {
                "name": "NASDAQ:AMD",
                "displayName": "AMD"
              },
              {
                "name": "NASDAQ:NFLX",
                "displayName": "Netflix"
              },
              {
                "name": "NASDAQ:MARA",
                "displayName": "Marathon Digital Holdings"
              },
              {
                "name": "NASDAQ:PYPL",
                "displayName": "PayPal"
              }
            ]
          }
        ],
        "showSymbolLogo": true,
        "isTransparent": false,
        "colorTheme": "dark",
        "locale": "en",
        "backgroundColor": "#131722"
      }
    `;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
