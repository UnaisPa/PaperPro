import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import PostSkeleton from '../components/postSkeleton'
import socketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';
const ENDPOINT = 'ws://localhost:5050';

const Portfolio = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(ENDPOINT);

        socket.onopen = () => {
            console.log('Connected to server');
            // Request real-time data based on current time
            socket.send('data-request');
        }; 

        socket.onmessage = (event) => {
            const newData = event.data
            
            console.log('Received data:', newData);
            setData(newData);
        };

        socket.onclose = () => {
            console.log('Disconnected from server');
        };

        return () => {
            socket.close();
        };
    }, [data]);

    return (
        <div className='text-white' >
            <h1>Real-Time Stock Data</h1>
            <pre>{data}</pre>
            {/* {data && (
                <ul>
                    {data.map((stock) => (
                        <li key={stock.symbol}>
                            {stock.name} ({stock.symbol}): {stock.price}
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    );
};

export default Portfolio;