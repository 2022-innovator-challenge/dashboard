type PipelineTimescaleData = {
    x: Date,
    y: number
}
  
type StackedLineChartDatasetElement = {
    label: string,
    backgroundColor: string,
    borderColor: string,
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
const currentDate = new Date();

function randomTimeScaleData(): PipelineTimescaleData[] {
    console.log(currentDate);
    console.log(new Date(currentDate.getDate()-1).getDate());
    currentDate.setDate(currentDate.getDate()-1);
    console.log(currentDate.getDate());
    return [
        {
            x: new Date(currentDate.getDate()-3),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: new Date(currentDate.getDate()-2),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: new Date(currentDate.getDate()-1),
            y: Math.floor(Math.random() * 10)
        },
        {
            x: currentDate,
            y: Math.floor(Math.random() * 10)
        }
    ]
}

function randomStackedLineChartDatasetElement(label: string, color: string): StackedLineChartDatasetElement {
    return {
        label: label,
        backgroundColor: color,
        borderColor: color,
        data: randomTimeScaleData(),
        fill: true
    }
}

function randomStackedLineChartDataSets(): StackedLineChartDatasetElement[] {
    return [
        randomStackedLineChartDatasetElement('build', 'blue'),
        randomStackedLineChartDatasetElement('test', 'red'),
        randomStackedLineChartDatasetElement('deploy', 'green'),
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
        randomStackedBarChartElement('success', 'green'),
        randomStackedBarChartElement('failure', 'red'),
        randomStackedBarChartElement('skipped', 'grey')
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