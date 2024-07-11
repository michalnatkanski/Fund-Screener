export type Fund = {
    currency: string;
    fundName: string;
    name: string;
    region: string;
    isin: string;
    type: string;
    performance: {
        asOfDate: string;
        data?: {
            period: string;
            value: number;
        }[];
    };
    read: any;
    launchDate: string;
    m1: { period: string; value: number; };
    m3: { period: string; value: number; };
    m6: { period: string; value: number; };
    y1: { period: string; value: number; };
    y3: { period: string; value: number; };
    si: { period: string; value: number; };
    asOfDate: string;
};

export type Funds = Fund[];

export type FilterOptions = {
    currency: string;
    region: string;
    type: string;
};

export interface OverviewType {
    fundName: string;
    fund: Fund[];
}

export interface PerformanceType {
    fundName: string;
    fund: PerformanceFund[];
}

export interface ReducedFunds {
    overview: OverviewType[];
    performance: PerformanceType[];
}

type PerformanceFund = {
    name: string;
    m1: { period: string; value: number; } | { period: string; value: string; };
    m3: { period: string; value: number; } | { period: string; value: string; };
    m6: { period: string; value: number; } | {};
    y1: {} | {};
    y3: {} | {};
    si: {} | {};
    asOfDate: string;
};