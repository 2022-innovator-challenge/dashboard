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
import useSWR from 'swr';
import styles from '../styles/LineChart.module.css';
import 'chartjs-adapter-moment';
import { parseDownloadsScraper } from '../utils/parseResponses';

type ScraperResponse = {
  id: number;
  package: string;
  version: string;
  downloads: number;
  date: string;
  created_at: string;
  updated_at: string;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseJson = response.json();
  return responseJson;
};

export default function LineChart() {
  const { data, error } = useSWR(
    'https://downloadstats.c2aecf0.kyma.ondemand.com/download-stats',
    fetcher,
    {
      refreshInterval: 300000
    }
  );

  const scraperResponses = data as ScraperResponse[];

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const chartData = {
    datasets: parseDownloadsScraper(scraperResponses)
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

  defaults.font.family = 'Roboto';

  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'NPM Downloads',
            font: {
              size: 20,
              weight: '500'
            }
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
