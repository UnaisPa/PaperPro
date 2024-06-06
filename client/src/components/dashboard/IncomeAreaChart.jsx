import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
// chart options
const areaChartOptions = {
    chart: {
        height: 450,
        type: 'area',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2
    },
    grid: {
        strokeDashArray: 0
    }
};

// ==============================|| INCOME AREA CHART ||============================== //

export default function IncomeAreaChart({ slot,}) {
    const {totalTrades,averageProfits} =useSelector((state)=>state.admin);
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        console.log(totalTrades,averageProfits)
        const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const currentDayIndex = new Date().getDay();

        // Rearrange the array to start from the current day
        const latest7Days = [
            ...weekdays.slice(currentDayIndex), // From current day to end of array
            ...weekdays.slice(0, currentDayIndex) // From start of array to just before current day
        ];
        setOptions((prevState) => ({
            ...prevState,
            colors: [theme.palette.primary.main, theme.palette.primary[700]],
            xaxis: {
                categories:
                    slot === 'month'
                        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                        : [...latest7Days],
                labels: {
                    style: {
                        colors: [
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey',
                            'grey'
                           ,
                        ]
                    }
                },
                axisBorder: {
                    show: true,
                    color: line
                },
                tickAmount: slot === 'month' ? 11 : 7
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            }
        }));
    }, [primary, secondary, line, theme, slot]);

    const [series, setSeries] = useState([
        {
            name: 'Page Views',
            data: [0, 86, 28, 115, 48, 210, 136]
        },
        {
            name: 'Sessions',
            data: [0, 43, 14, 56, 24, 105, 68]
        }
    ]);

    useEffect(() => {
        setSeries([
            {
                name: 'Trades',
                data: slot === 'month' ? [76, 85, 101, 98, 8, 105, 91, 114, 94, 86, 115, 35] : [...totalTrades]
            },
            {
                name: 'Average Profit',
                data: slot === 'month' ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41] : [...averageProfits]
            }
        ]);
    }, [slot]);

    return <ReactApexChart options={options} series={series} type="area" height={350} />;
}

IncomeAreaChart.propTypes = { slot: PropTypes.string };