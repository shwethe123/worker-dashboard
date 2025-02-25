import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';

const generateDayWiseTimeSeries = (baseval, count, yrange) => {
  let i = 0;
  let series = [];
  while (i < count) {
    let x = baseval;
    let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000; // increment by one day
    i++;
  }
  return series;
};

const Chart = () => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {},
  });

  useEffect(() => {
    // Set the chart options and data
    const options = {
      series: [
        {
          name: 'South',
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 60,
          }),
        },
        {
          name: 'North',
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 20,
          }),
        },
        {
          name: 'Central',
          data: generateDayWiseTimeSeries(new Date('11 Feb 2017 GMT').getTime(), 20, {
            min: 10,
            max: 15,
          }),
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        events: {
          selection: function (chart, e) {
            console.log(new Date(e.xaxis.min)); // Log the selected range on the chart
          },
        },
      },
      colors: ['#008FFB', '#00E396', '#CED4DC'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'monotoneCubic',
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.8,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };

    // Set the state to render the chart
    setChartData({
      series: options.series,
      options: options,
    });
  }, []);

  return (
    <div className='bg-white p-5 rounded-lg shadow-lg'>
      <h1>Worker Data Chart</h1>
      <div id="chart">
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart;
