import { Server, Socket } from "socket.io";
// import { io } from "./app.js";
import cron from "node-cron"
import moment from "moment-timezone";
import axios from "axios"
// import { wss } from "./app.js";
import WebSocket from "ws"
const socketConfig = (wss) => {

    //console.log('Socket file')
    let isRequesting = false;
    let requestQueue = [];
    let token = process.env.FINNHUB_API_KEY
    let isSocketConnected = false;
    function processQueue(symbol) {
        if (!isRequesting && isSocketConnected) {
            isRequesting = true;
            console.log(symbol);
            requestQueue.shift();
            axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`)
                .then(response => {
                    //console.log('de')
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(response.data));
                        }
                    });
                    var indianTime = moment().tz('Asia/Kolkata');
                    var isBetween = indianTime.isBetween(
                        moment.tz('19:00', 'HH:mm', 'Asia/Kolkata'),
                        moment.tz('01:30', 'HH:mm', 'Asia/Kolkata'),
                        null,
                        '[)'
                    );
                    setTimeout(() => {
                        isRequesting = false;
                        if(isBetween){
                            processQueue(symbol);
                        }
                        
                    }, 1000); // Delay 1 second between requests
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    isRequesting = false;
                    //processQueue(symbol);
                });
            // const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TSLA', 'NVDA', 'NFLX', 'ADBE', 'INTC'];
            // const promises = symbols.map(symbol => {
            //     return axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${token}`);
            // });

            // Promise.all(promises)
            //     .then(responses => {
            //         responses.forEach(response => {
            //             wss.clients.forEach(client => {
            //                 if (client.readyState === WebSocket.OPEN) {
            //                     client.send(JSON.stringify(response.data));
            //                 }
            //             });
            //         });
            //         setTimeout(() => {
            //             isRequesting = false;
            //             processQueue();
            //         }, 1000); // Delay 1 second between requests
            //     })
            //     .catch(error => {
            //         //console.error('Error fetching data:', error);
            //         isRequesting = false;
            //         processQueue();
            //     });
        }
    }

    wss.on('connection', (socket) => {
        console.log('Client connected');
        socket.on('message', (message) => {
            //console.log(message);

            // if (message.toString() === 'data-request') {
            //     requestQueue.push(true);
            //     processQueue(); 
            // }
            isSocketConnected = true
            if (typeof message.toString() === 'string' && message.toString().length > 0) {
                let symbol = message.toString().toUpperCase()
                requestQueue.push(true);
                //console.log(symbol);
                processQueue(symbol);

            }
        });

        socket.on('close', () => {
            //isRequesting = true;
            isSocketConnected = false
            console.log('Client disconnected');
        });
    })
}

export default socketConfig