import React from 'react'
import { SymbolOverview } from "react-ts-tradingview-widgets"

const SymbolDetails = ({symbol}) => {
    const enteredSymbol = symbol.toUpperCase()
    // const symbols = ["AAPL", "GOOG", "TSLA"]
    const symbols = [symbol]
    return (

        <SymbolOverview isTransparent symbols={symbols} autosize colorTheme='dark' />

    )
}

export default SymbolDetails