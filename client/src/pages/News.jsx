import React from 'react'
import Header from '../components/Header'
import {Timeline} from "react-ts-tradingview-widgets"
import { MoonLoader } from 'react-spinners'

const News = () => {
    return (
        <div>
            <Header />
            <div style={{height:'470px'}} className=' mx-auto w-11/12  mt-10' >
                <Timeline  isTransparent  autosize colorTheme='dark' />
            </div>
        </div>
    )
}

export default News