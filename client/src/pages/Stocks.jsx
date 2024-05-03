import React from 'react'
import Header from '../components/Header'
import TradingViewWidget from '../components/ListedStocks'

const Stocks = () => {
  return (
    <div className='min-full' >
        <Header/>
        <TradingViewWidget/>
    </div>
  )
}

export default Stocks