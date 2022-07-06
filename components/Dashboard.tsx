import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2';
import useSWR, { mutate } from 'swr';


type CrawlerResponse = {
    id: number,
    package: string,
    version: string,
    downloads: number,
    date: string,
    created_at: string,
    updated_at: string
}

type DatasetElement = {
    label: string,
    backgroundColor: string,
    borderColor: string,
    data: number[]
}

const fetcher = async (url: string) => {
    const response = await fetch(url)
    const responseJson = response.json();
    return responseJson
};

const colorPalette = [
    'rgb(0, 91, 110)',
    'rgb(4, 102, 140)',
    'rgb(60, 108, 167)',
    'rgb(114, 110, 183)',
    'rgb(168, 107, 186)',
    'rgb(218, 102, 172)',
    'rgb(255, 103, 146)'
]

export default function Dashboard() {

    const dataEndpoint = "https://downloadstats.c2aecf0.kyma.ondemand.com/download-stats"
    const { data, error } = useSWR(dataEndpoint, fetcher, { refreshInterval:300000 });

    const crawlerResponses = (data as CrawlerResponse[]);

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    const labels = [...new Set<string>(crawlerResponses.map(objectElement => objectElement.date))];

    const dataSets: DatasetElement[] = [];

    for(let i=0; i<7; i++) {
        const dataSet: number[] = [];
        for(let j = i; j<data.length; j=j+7) {
            dataSet.push(crawlerResponses[j].downloads)
        }
        dataSets.push({
            label: `${crawlerResponses[i].package} Version ${crawlerResponses[i].version}`,
            backgroundColor: colorPalette[i],
            borderColor: colorPalette[i],
            data: dataSet
        })
    }
    
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
      )
      
      return (
        <div>
            <Line data={chartData}/>
            <button onClick={() => {
                mutate(dataEndpoint)
            }}>
                Refresh
            </button>
        </div>
    )
}
