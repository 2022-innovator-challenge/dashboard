import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useSWR, { mutate } from 'swr';
import styles from '../styles/Linechart.module.css';

type CrawlerResponse = {
  id: number;
  package: string;
  version: string;
  downloads: number;
  date: string;
  created_at: string;
  updated_at: string;
};

type DatasetElement = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: (number | null)[];
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const responseJson = response.json();
  return responseJson;
};

const colorPalette = [
  'rgb(0, 91, 110)',
  'rgb(4, 102, 140)',
  'rgb(60, 108, 167)',
  'rgb(114, 110, 183)',
  'rgb(168, 107, 186)',
  'rgb(218, 102, 172)',
  'rgb(255, 103, 146)',
  'rgb(255, 115, 186)'
];

// improve API to work with random orders and missing data entries
export default function Dashboard() {
  const dataEndpoint =
    'https://downloadstats.c2aecf0.kyma.ondemand.com/download-stats';
  const { data, error } = useSWR(dataEndpoint, fetcher, {
    refreshInterval: 300000
  });

  const crawlerResponses = data as CrawlerResponse[];

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const labels = [
    ...new Set<string>(
      crawlerResponses.map(crawlerResponse => crawlerResponse.date)
    )
  ].sort((a, b) => a.localeCompare(b));

  const dataSets: DatasetElement[] = [];

  type downloadsAndDate = { date: Date; downloads: number };
  const parsedResponses = new Map<string, downloadsAndDate[]>();
  crawlerResponses.map(crawlerResponse => {
    if (
      parsedResponses.has(
        `${crawlerResponse.package} Version ${crawlerResponse.version}`
      )
    ) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const packageData = parsedResponses.get(
        `${crawlerResponse.package} Version ${crawlerResponse.version}`
      )!;
      packageData.push({
        date: new Date(crawlerResponse.date),
        downloads: crawlerResponse.downloads
      });
      parsedResponses.set(
        `${crawlerResponse.package} Version ${crawlerResponse.version}`,
        packageData
      );
    } else {
      parsedResponses.set(
        `${crawlerResponse.package} Version ${crawlerResponse.version}`,
        [
          {
            date: new Date(crawlerResponse.date),
            downloads: crawlerResponse.downloads
          }
        ]
      );
    }
  });

  parsedResponses.forEach(element =>
    element.sort(function (a: downloadsAndDate, b: downloadsAndDate) {
      return a.date.getTime() - b.date.getTime();
    })
  );

  let iterator = 0;
  parsedResponses.forEach((element, key) => {
    const downloadNumbersArray: (number | null)[] = [];

    for (let i = 0, j = 0; i < labels.length; i++) {
      if (element[j]?.date.getTime() === new Date(labels[i]).getTime()) {
        downloadNumbersArray.push(element[j].downloads);
        j++;
      } else {
        downloadNumbersArray.push(null);
      }
    }

    dataSets.push({
      label: key,
      backgroundColor: colorPalette[iterator],
      borderColor: colorPalette[iterator],
      data: downloadNumbersArray
    });
    iterator++;
  });
  iterator = 0;

  const chartData = {
    labels: labels,
    datasets: dataSets
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className={styles.lineChart}>
      <Line data={chartData} />
      <button
        onClick={() => {
          mutate(dataEndpoint);
        }}
      >
        Refresh
      </button>
    </div>
  );
}
