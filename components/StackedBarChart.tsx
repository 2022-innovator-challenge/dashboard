import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    LinearScale,
    defaults
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from '../styles/LineChart.module.css';
import 'chartjs-adapter-moment';

type StackedBarChartDataSet = {
    labels: string,
    datasets: [
        label: string,
        data: number[],
        backgroundColor: string
    ]
}

export default function StackedBarChart({
    dataSet
  }: {
    dataSet: StackedBarChartDataSet
  }) {
  
    const chartData = {
      datasets: dataSet
    };
  
    ChartJS.register(
      CategoryScale,
      PointElement,
      LineElement,
      LinearScale,
      TimeScale,
      Title,
      Tooltip,
      Legend
    );
  
    defaults.font.family = "Inter";
  
    return (
      <div className={styles.lineChartContainer}>
        <div className={styles.lineChart}>
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Github Actions",
                  font: {
                    size: 20,
                    weight: "500"
                  }
                }
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "week",
                  }
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
  