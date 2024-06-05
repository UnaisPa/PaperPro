import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
// Utility function to format dates
import formatDate from '../helper/formatDate';

// Chart options
const barChartOptions = {
    chart: {
        type: 'bar',
        height: 365,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '45%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    xaxis: {
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },
    yaxis: {
        show: false
    },
    grid: {
        show: false
    }
};

// Component definition
export default function TradeAnalysis({tradingData}) {
    //const completedTrades = useSelector((state) => state.completedTrades)

    //const tradingData = completedTrades;
    const theme = useTheme();
    const { primary, secondary } = theme.palette.text;
    const info = theme.palette.info.light;
    // useEffect(()=>{
    //     console.log(tradingData)
    // },[])
    // Extract dates and profits from trading data
    const dates = tradingData.map(entry => formatDate(entry.createdAt));
    const profits = tradingData.map(entry => parseFloat(entry.profit).toFixed(2));

    // Set initial series and options state
    const [series, setSeries] = useState([{ data: profits }]);
    const [options, setOptions] = useState({
        ...barChartOptions,
        xaxis: {
            ...barChartOptions.xaxis,
            categories: dates
        }
    });

    // Update chart options based on theme changes
    useEffect(() => {
        setOptions(prevState => ({
            ...prevState,
            colors: [info],
            xaxis: {
                ...prevState.xaxis,
                labels: {
                    style: {
                        colors: dates.map(() => secondary)
                    }
                }
            }
        }));
    }, [primary, info, secondary, dates]);

    return (
        <Box id="chart" sx={{ bgcolor: 'transparent' }}>
            <ReactApexChart options={options} series={series} type="bar" height={365} />
        </Box>
    );
}
