import React, { useEffect, useRef } from 'react';

const TradingViewWidget = () => {
  const shouldReload = useRef(true);

 useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js';
  script.async = true;
  script.innerHTML = `
    {
      "width": "100%",
      "height": 400,
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
            // Other symbols...
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
    if (document.body.contains(script)) {
      console.log('Cleanup function called');
      document.body.removeChild(script);
    }
    //window.location.reload(); // Reload the entire page
  };
}, []);



  return (
    <div className="tradingview-widget-container" style={{ height: '400px' }}>
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
