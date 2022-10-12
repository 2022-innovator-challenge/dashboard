type PipelineTimescaleData = {
    x: Date,
    y: number
}
  
type StackedLineChartDatasetElement = {
    label: string,
    backgroundColor: string,
    borderColor: string,
    pointBackgroundColor: string,
    pointBorderColor: string,
    data: PipelineTimescaleData[],
    fill: boolean,
};

export type StackedLineChartData = {
    datasets: StackedLineChartDatasetElement[]
}

type StackedBarChartDatasetElement = {
    label: string,
    data: number[],
    backgroundColor: string
};

export type StackedBarChartData = {
    labels: string[],
    datasets: StackedBarChartDatasetElement[]
}


const stackedBarChartLabels = ["build", "test", "deploy"];

function randomTimeScaleData(): PipelineTimescaleData[] {
    return [
        {
            x: new Date(new Date().setDate(new Date().getDate()-3)),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-2)),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-1)),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: new Date(),
            y: Math.floor(Math.random() * 10)
        }
    ]
}

function randomStackedLineChartDatasetElement(label: string, color: string): StackedLineChartDatasetElement {
    return {
        label: label,
        backgroundColor: color,
        borderColor: color,
        pointBackgroundColor: "black",
        pointBorderColor: "black",
        data: randomTimeScaleData(),
        fill: true
    }
}

function randomStackedLineChartDataSets(): StackedLineChartDatasetElement[] {
    randomStackedLineChartDatasetElement('test', 'black').data.map(element => console.log(element.x, element.y));
    return [
        randomStackedLineChartDatasetElement('build', 'rgba(0, 91, 110, 0.5)'),
        randomStackedLineChartDatasetElement('test', 'rgba(168, 107, 186, 0.5)'),
        randomStackedLineChartDatasetElement('deploy', 'rgba(255, 103, 146, 0.5)'),
    ]
}

function randomStackedBarChartElement(label: string, backgroundColor: string): StackedBarChartDatasetElement {
    return {
        label: label,
        data: [
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 10)
        ],
        backgroundColor: backgroundColor
    }
}

function randomStackedBarChartDataSets(): StackedBarChartDatasetElement[] {
    return [
        randomStackedBarChartElement('success', 'rgb(0, 91, 110)'),
        randomStackedBarChartElement('failure', 'rgb(255, 103, 146)'),
        randomStackedBarChartElement('skipped', 'rgb(114, 110, 183)')
    ]
}

export const githubStackedBarChartData: StackedBarChartData = {
    labels: stackedBarChartLabels,
    datasets: randomStackedBarChartDataSets()
}

export const githubStackedLineChartData = {
    datasets: randomStackedLineChartDataSets()
};

export const jenkinsStackedBarChartData = {
    labels: stackedBarChartLabels,
    datasets: randomStackedBarChartDataSets()
};
export const jenkinsStackedLineChartData = {
    datasets: randomStackedLineChartDataSets()
};
