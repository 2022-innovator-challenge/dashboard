import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    defaults,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
import { StackedBarChartData } from '../utils/mock-data';
  
export default function StackedBarChart({ name, data, xTitle }: { name?: string, data: StackedBarChartData, xTitle: string }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );
  
    defaults.font.family = "Roboto";
  
    return (
        <Bar
        data={data}
        options={{
            plugins: {
                title: {
                    display: false,
                    text: name,
                    font: {
                        size: 20,
                        weight: "500"
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: xTitle
                    }
                },
                y: {
                    stacked: true,
                }
            }
        }}
        />
    );
  }
