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
    defaults,
    Filler
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from '../styles/LineChart.module.css';
import 'chartjs-adapter-moment';
import { StackedLineChartData } from '../utils/mock-data';
  
  export default function StackedLineChart({ name, data }: { name: string, data: StackedLineChartData }) {

    ChartJS.register(
      CategoryScale,
      PointElement,
      LineElement,
      LinearScale,
      TimeScale,
      Filler,
      Title,
      Tooltip,
      Legend
    );
  
    defaults.font.family = "Inter";
  
    return (
      <div className={styles.lineChartContainer}>
        <div className={styles.lineChart}>
            
          <Line
            data={data}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: name,
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
                    unit: "day",
                  }
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'minutes'
                    }
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
  