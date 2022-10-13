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
import { Bar } from 'react-chartjs-2';
import styles from '../styles/LineChart.module.css';
import 'chartjs-adapter-moment';
import { StackedBarChartData } from '../utils/mock-data';
  
  export default function StackedLineChart({ name, data }: { name: string, data: StackedBarChartData }) {

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
  
    defaults.font.family = "Roboto";
  
    return (
      <div className={styles.lineChartContainer}>
        <div className={styles.lineChart}>
            
          <Bar
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
  
/*
const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart - Stacked'
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    }
  };
*/