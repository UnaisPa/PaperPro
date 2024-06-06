import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import formatDate from '../helper/formatDate';



const PortfolioPerformanceGraph = ({ tradingData }) => {
    
  const dates = tradingData.map(entry => formatDate(entry.createdAt));
  const profits = tradingData.map(entry => (entry.profit).toFixed(2));
  const investments = tradingData.map(entry => entry.totalPrice);

  useEffect(()=>{
    console.log(tradingData)
  },[])
  
  const series = [{
    name: 'Profit',
    data: profits,
  }];

  const options = {
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: false,
      },
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 0,
    },
    xaxis: {
      categories: dates,
      labels: {
        formatter: function(value, timestamp, index) {
          return `${value}`;
        },style: {
            colors: '#1E2530' // Set x-axis label color
          }
      },
      title: {
        text: `Last ${tradingData.length} Trades Overview`,
      },
    },
    yaxis: {
      labels: {
        formatter: function(value) {
          return `${value} USD`;
        },style: {
            colors: '#1E2530' // Set x-axis label color
          }
      },
      title: {
        text: 'Profit (USD)',
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: '#FF4560',
          label: {
            borderColor: '#FF4560',
            style: {
              color: '#fff',
              background: '#FF4560',
            },
           
          }
        }
      ]
    },
    grid: {
      show: true,
      yaxis: {
        lines: {
          show: false,
        }
      },
      xaxis: {
        lines: {
          show: false,
        }
      },
    },
    colors: ['#00E396'],
    theme: {
      mode: 'dark', 
    },
  };

  return (
    <div id="chart">
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default PortfolioPerformanceGraph