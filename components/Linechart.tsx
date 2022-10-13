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
import 'chartjs-adapter-moment';
import { LineChartData } from '../utils/parseResponses';

export default function LineChart({ title, dataset, error, legend=true }: { title?: string, dataset?: LineChartData, error?: Error, legend?: boolean }) {


  if (error) return <div>failed to load</div>;
  if (!dataset) return <div>loading...</div>;

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
  defaults.font.family = 'Roboto';

  return (
    <Line
      data={dataset}
      options={{
        plugins: {
          title: {
            display: (title != undefined),
            text: title,
            font: {
              size: 20,
              weight: '500'
            }
          },
          legend: {
            display: legend
          }
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'week'
            }
          }
        }
      }}
    />
  );
}
