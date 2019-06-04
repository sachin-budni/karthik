
export class ChartjsDoughuntData {
    public data: any[];
    public backgroundColor: string[];
  borderWidth: number=2;

    constructor() {
        this.data = [];
        this.backgroundColor = [];
    }
}

export class ChartjsDoughunt {
    public data: ChartjsDoughuntData;
    public labels: string[];

    constructor() {
        this.data = new ChartjsDoughuntData();
        this.labels = [];
    }
}



export class ChartjsPolarData {
    public data: any[];
    public backgroundColor: string[];

    constructor() {
        this.data = [];
        this.backgroundColor = [];
    }
}

export class ChartjsPolar {
    public data: ChartjsPolarData;
    public labels: string[];

    constructor() {
        this.data = new ChartjsPolarData();
        this.labels = [];
    }
}


export class ChartjsBarData {
    public data: any[];
    public backgroundColor: any;
    public label: string;

    constructor() {
        this.data = [];
        this.label = '';
        this.backgroundColor = '';
    }
}

export class ChartjsBar {
    public data: ChartjsBarData[];
    public labels: string[];
    public fontColor: string

    constructor() {
        this.data = [];
        this.labels = [];
    }
}


export class ChartHighStockSeries {
    public id: string;
    public name: string;
    public color;
    public data: any[];
    public tooltip: {
        valueDecimals: 2
    };
}


export class ChartHighStock {

    constructor(series: ChartHighStockSeries,
        color: string)

    constructor(seriesList: ChartHighStockSeries[],
        color: string)
    constructor(series?: ChartHighStockSeries | ChartHighStockSeries[],
        color?: string) {
        this.color = color;
        this.seriesList = [];
        // if (series) {
        //     this.seriesList.push(series);
        // }

        if (typeof series === 'undefined' || series === null) {
            this.seriesList = [];
            // this.series = series;
        } else if (series instanceof Array) {
            this.seriesList = series;

        } else if (typeof series === 'object') {
            this.series = series;

            this.seriesList = [series];

        }

    }
    public seriesList: ChartHighStockSeries[];
    public series: ChartHighStockSeries;
    public color: string;

    public useTime: Boolean = false;
}