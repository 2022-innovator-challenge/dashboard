import { LineChartDatasetElement } from "./parseResponses";

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

function randomDownwardsTimeScaleData(): PipelineTimescaleData[] {

    const baseLine = Math.floor(Math.random() * 10) + 1

    return [
        {
            x: new Date(new Date().setDate(new Date().getDate()-3)),
            y: Math.floor(Math.random() * 10) + baseLine
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-2)),
            y: Math.floor(Math.random() * 10) + baseLine
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-1)),
            y: Math.floor(Math.random() * 10) + 1 + baseLine
        },
        {
            x: new Date(),
            y: baseLine
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
        data: randomDownwardsTimeScaleData(),
        fill: true
    }
}

function randomStackedLineChartDataSets(): StackedLineChartDatasetElement[] {
    return [
        randomStackedLineChartDatasetElement('build', '#ffa600'),
        randomStackedLineChartDatasetElement('test', '#f95d6a'),
        randomStackedLineChartDatasetElement('deploy', '#003f5c'),
    ]
}

function randomStackedBarChartElement(label: string, backgroundColor: string): StackedBarChartDatasetElement {
    return {
        label: label,
        data: [
            Math.floor(Math.random() * 10) + 3,
            Math.floor(Math.random() * 10) + 3,
            Math.floor(Math.random() * 10) + 3
        ],
        backgroundColor: backgroundColor
    }
}

function randomStackedBarChartDataSets(): StackedBarChartDatasetElement[] {
    return [
        randomStackedBarChartElement('success', '#2f4b7c'),
        randomStackedBarChartElement('failure', '#f95d6a'),
        randomStackedBarChartElement('skipped', 'grey')
    ]
}

function randomLineChartDatasetElement(label: string, color: string): LineChartDatasetElement {
    return {
        label: label,
        backgroundColor: color,
        borderColor: color,
        data: randomTimeScaleData(),
    }
}

const githubSpecificStackedBarChartDataSets: StackedBarChartDatasetElement[] = [
    {
        label: 'success',
        data: [
            27,
            23,
            20
        ],
        backgroundColor: '#2f4b7c'
    },
    {
        label: 'failure',
        data: [
            3,
            4,
            3
        ],
        backgroundColor: '#f95d6a'
    },
    {
        label: 'skipped',
        data: [
            0,
            3,
            7
        ],
        backgroundColor: 'grey'
    }
]

const jenkinsSpecificStackedBarChartDataSets: StackedBarChartDatasetElement[] = [
    {
        label: 'success',
        data: [
            30,
            15,
            10
        ],
        backgroundColor: '#2f4b7c'
    },
    {
        label: 'failure',
        data: [
            10,
            15,
            5
        ],
        backgroundColor: '#f95d6a'
    },
    {
        label: 'skipped',
        data: [
            0,
            10,
            25
        ],
        backgroundColor: 'grey'
    }
]

const trendSpecificLineChartData = {
    label: 'Response Time',
    backgroundColor: '#53a158',
    borderColor: '#53a158',
    data: [
        {
            x: new Date(new Date().setDate(new Date().getDate()-3)),
            y: 182
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-2)),
            y: 184
        },
        {
            x: new Date(new Date().setDate(new Date().getDate()-1)),
            y: 181
        },
        {
            x: new Date(),
            y: 169
        }
    ]
}

export const githubStackedBarChartData: StackedBarChartData = {
    labels: stackedBarChartLabels,
    datasets: githubSpecificStackedBarChartDataSets
}

export const githubStackedLineChartData = {
    datasets: randomStackedLineChartDataSets()
};

export const jenkinsStackedBarChartData = {
    labels: stackedBarChartLabels,
    datasets: jenkinsSpecificStackedBarChartDataSets
};
export const jenkinsStackedLineChartData = {
    datasets: randomStackedLineChartDataSets()
};

export const trendLineChartData = {
    datasets: [trendSpecificLineChartData]
}
