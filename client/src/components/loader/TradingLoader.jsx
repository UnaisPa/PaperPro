import React, { useEffect, useState } from 'react';
import './tradingLoader.css'; // Import your CSS styles

const TradingLoader = () => {

    return (
        <>
        <div className='mx-auto my-80 sm:my-60' >
        <div className="spinner">
            <div className="rect1 mr-0.5"></div>
            <div className="rect2 mr-0.5"></div>
            <div className="rect3 mr-0.5"></div>
            <div className="rect4 mr-0.5"></div>
            <div className="rect5 mr-0.5"></div>
        </div>
        </div>
        </>
        
    );
};

export default TradingLoader;
