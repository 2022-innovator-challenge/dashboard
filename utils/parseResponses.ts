export type ScraperResponse = {
  id: number;
  package: string;
  version: string;
  downloads: number;
  date: string;
  created_at: string;
  updated_at: string;
};

type DownloadTimescaleData = {
  x: Date;
  y: number;
};

type DatasetElement = {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: DownloadTimescaleData[];
};

const colorPalette = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600'
];

type DownloadsAndDate = { date: Date; downloads: number };

export function parseDownloadsScraper(
  scraperResponses: ScraperResponse[]
): DatasetElement[] {
  const parsedResponses = new Map<string, DownloadsAndDate[]>();
  scraperResponses.map(scraperResponse => {
    const label = packageLabel(scraperResponse);
    parsedResponses.set(label, [
      ...(parsedResponses.get(label) || []),
      {
        date: new Date(scraperResponse.date),
        downloads: scraperResponse.downloads
      }
    ]);
  });

  parsedResponses.forEach(element =>
    element.sort(function (a: DownloadsAndDate, b: DownloadsAndDate) {
      return a.date.getTime() - b.date.getTime();
    })
  );

  const parsedDataSets: DatasetElement[] = [];

  let colorPaletteIterator = 0;
  parsedResponses.forEach((downloadData, packageName) => {
    const downloadEntries: DownloadTimescaleData[] = [];

    downloadData.map(downloadDataEntry => {
      downloadEntries.push({
        x: downloadDataEntry.date,
        y: downloadDataEntry.downloads
      });
    });

    parsedDataSets.push({
      label: packageName,
      backgroundColor: colorPalette[colorPaletteIterator],
      borderColor: colorPalette[colorPaletteIterator],
      data: downloadEntries
    });
    colorPaletteIterator++;
  });

  return parsedDataSets;
}

function packageLabel(scraperResponse: ScraperResponse): string {
  return `${scraperResponse.package} (v${scraperResponse.version})`;
}
