declare interface LegendCallback {
    name: string;
    selected: Object;
    type: string;
}

declare interface NameKeyPair {
    name: string;
    value: number;
    itemStyle?: object;
    label?: object;
    tooltip?: object;
    labelLine?: object;
}

interface LineChartPairChild {
    data: Array<any>;
    unit: string;
}

declare interface LineChartPair {
    xaxis: LineChartPairChild
    yaxis: LineChartPairChild
}

