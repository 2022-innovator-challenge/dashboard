import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useSWR from 'swr';
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
    ...new Set<Date>(
      crawlerResponses.map(crawlerResponse => new Date(crawlerResponse.date))
    )
  ];

  type DownloadsAndDate = { date: Date; downloads: number };
  const parsedResponses = new Map<string, DownloadsAndDate[]>();
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


  type DownloadsTimescaleData = {
    x: string,
    y: number
  }
  
  type DatasetElement = {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: DownloadsTimescaleData[];
  };

  const dataSets: DatasetElement[] = [];
  
  let iterator = 0;
  parsedResponses.forEach((downloadData, packageName) => {
    const downloadEntries: DownloadsTimescaleData[] = [];

    downloadData.map(downloadDataEntry => {
      downloadEntries.push({
        x: downloadDataEntry.date.toString(),
        y: downloadDataEntry.downloads
      })
    })

    dataSets.push({
      label: packageName,
      backgroundColor: colorPalette[iterator],
      borderColor: colorPalette[iterator],
      data: downloadEntries
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
    PointElement,
    LineElement,
    TimeScale,
    Title,
    Tooltip,
    Legend
  );

  return (
    <div className={styles.lineChartContainer}>
      <div className={styles.lineChart}>
        <Line
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "NPM Downloads",
                font: {
                  size: 20
                }
              }
            },
            scales: {
              x: {
                type: "time",
                time: {
                  tooltipFormat: "DD T"
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
