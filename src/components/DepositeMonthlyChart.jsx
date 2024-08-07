import ReactECharts from 'echarts-for-react';  
import { numberToMonth } from '../helper/date.ts';
const DepositeMonthlyChart = (props) => {
    const {
      title,
      data
    } = props;

    console.log(data);
    const option = {
      title: { text: title },
      xAxis: { type: 'category', data: data ? data.map(el => numberToMonth(el.month)) : [] },
      yAxis: { type: 'value' },
      series: [{ data: data ? data.map(el => el.total) : [], type: 'bar' }]
    };
  
    return <ReactECharts option={option} />;
  };

  export default DepositeMonthlyChart;