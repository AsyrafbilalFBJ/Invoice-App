import { Chart as ChartJs, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { getInvoicesReports } from '../utils/data';
import { useEffect, useState } from 'react';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function Graph() {
  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState('daily');

  useEffect(() => {
      const fetchGraph = async (graphType) => {
          try {
              const graphResult = await getInvoicesReports(graphType);
              if (graphType === 'daily') {
                  setDailyData(graphResult.data);
              } else if (graphType === 'weekly') {
                  setWeeklyData(graphResult.data);
              } else if (graphType === 'monthly') {
                  setMonthlyData(graphResult.data);
              }
          } catch (error) {
              console.error('Error fetching invoices:', error);
          }
      };

      fetchGraph('daily');
      fetchGraph('weekly');
      fetchGraph('monthly');
  }, []);

  if (!dailyData.length || !weeklyData.length || !monthlyData.length) {
    return <div>Loading...</div>;
}

const data = {
  labels:
      selectedDataset === 'daily'
          ? dailyData.map((inc) => inc.day_name)
          : selectedDataset === 'weekly'
          ? weeklyData.map((income) => income.week_start)
          : monthlyData.map((income) => income.month),
  datasets: [
      {
          label: 'Revenue',
          data:
              selectedDataset === 'daily'
                  ? dailyData.map((income) => parseFloat(income.total_sales))
                  : selectedDataset === 'weekly'
                  ? weeklyData.map((income) => parseFloat(income.total_sales))
                  : monthlyData.map((income) => parseFloat(income.total_sales)),
          backgroundColor: selectedDataset === 'daily' ? 'green' : selectedDataset === 'weekly' ? 'blue' : 'orange',
          tension: 0.2,
      }
  ]
};

  return (
    <div>
        <select onChange={(e) => setSelectedDataset(e.target.value)} value={selectedDataset}
          className='border border-5 rounded-5 border-white bg-light shadow-sm'
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>
        <Line data={data} />
    </div>
  );
}

export default Graph;
