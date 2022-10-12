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
    x: Date,
    y: number
}
  
type DatasetElement = {
    label: string;
    backgroundColor: string;
    borderColor: string;
    data: DownloadTimescaleData[];
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

type DownloadsAndDate = { date: Date; downloads: number };

export function parseDownloadsScraper(scraperResponses: ScraperResponse[]): DatasetElement[] {
    const parsedResponses = new Map<string, DownloadsAndDate[]>();
    scraperResponses.map(scraperResponse => {
      if (
        parsedResponses.has(
          `${scraperResponse.package} Version ${scraperResponse.version}`
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const packageData = parsedResponses.get(
          `${scraperResponse.package} Version ${scraperResponse.version}`
        )!;
        packageData.push({
          date: new Date(scraperResponse.date),
          downloads: scraperResponse.downloads
        });
        parsedResponses.set(
          `${scraperResponse.package} Version ${scraperResponse.version}`,
          packageData
        );
      } else {
        parsedResponses.set(
          `${scraperResponse.package} Version ${scraperResponse.version}`,
          [
            {
              date: new Date(scraperResponse.date),
              downloads: scraperResponse.downloads
            }
          ]
        );
      }
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
        })
      })
  
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