
import { Funds, Fund, FilterOptions, OverviewType, PerformanceType } from "../../types";
//get fund types

const getAllTypes = (funds: Funds) => {
    if (!funds) return
    const currencies = funds.map(fund => fund.currency);
    const regions = funds.map(fund => fund.region);
    const types = funds.map(fund => fund.type);
    const allCurrencies = currencies.filter((r, i) => currencies.indexOf(r) === i)
    const allRegions = regions.filter((r, i) => regions.indexOf(r) === i)
    const allTypes = types.filter((r, i) => types.indexOf(r) === i);
    return { allCurrencies, allRegions, allTypes }
}

//filtering uncompleted data

const fundsFitler = ((fund: Fund) =>
    fund &&
    fund.fundName &&
    fund.name && 
    fund.currency &&
    fund.region &&
    fund.isin &&
    fund.type &&
    fund.performance)

//funds filtering by choosen select options

const fundsFiltering = (data:Funds, filterOptions:FilterOptions) => {
    const { currency, region, type } = filterOptions;
   
    const getFunds = (data: Funds, filter: (fund: Fund) => "" | { asOfDate: string; data?: { period: string; value: number; }[] }) => {
        return data.filter(app => filter(app))
    }

    const funds = getFunds(data, fundsFitler)
    
    //alphabetical sort 
    if (!funds) return
    const sortedFunds = funds.sort((a, b) => a.name.localeCompare(b.name))

    //funds fiilltering by selected option
    if (currency === 'All' && region !== 'All') {
        let filteredData = sortedFunds.filter((fund: Fund) => {
            return (
                fund.region === region &&
                fund.type === type
            )
        })
        return filteredData;
    }
    else if (region === 'All' && currency !== 'All') {
        let filteredData = sortedFunds.filter((fund: Fund) => {
            return (
                fund.currency === currency &&
                fund.type === type
            )
        })
        return filteredData;
    }
    else if (region === 'All' && currency === 'All') {
        let filteredData = sortedFunds.filter((fund: Fund) => {
            return (
                fund.type === type
            )
        })
        return filteredData;
    }
    else {
        let filteredData = sortedFunds.filter((fund: Fund) => {
            return (
                fund.region === region &&
                fund.currency === currency &&
                fund.type === type
            )
        })
        return filteredData;
    }
}

//search result filtering

const searchResult = (funds: Funds | undefined, searchValue: string) => {
    if (!funds) return
    if (searchValue === '') {
        return null
    } else {
        return funds.filter(fund => {
            return (
                fund.fundName.toUpperCase().includes(searchValue.toUpperCase()) ||
                fund.name.toUpperCase().includes(searchValue.toUpperCase())
            )
        })
    }
};

//reducer/grouping funds by fundName

const fundsReducer = (funds:Funds | undefined) => {

    if (!funds) return
    const reducedFunds: { [key: string]: Fund[] } = funds.reduce((reducedFunds, fund) => {
        (reducedFunds[fund.fundName] = reducedFunds[fund.fundName] || []).push(fund)
        return reducedFunds;
    }, {} as { [key: string]: Fund[] });

    //grouping by fundname

    const overview: OverviewType[] = [];
    const performance: PerformanceType[] = [];


    Object.keys(reducedFunds).map(fundName => {

        const fund = reducedFunds[fundName].map(fund => fund)

        const periodFilter = (periods?: { period: string; value: number }) => periods === undefined ? { period: '-', value: '-' } : periods;

        const data = reducedFunds[fundName].map((fund: Fund) => {
            const performanceData = fund.performance.data ?? [];
            const m1 = periodFilter(performanceData[0])
            const m3 = periodFilter(performanceData[1])
            const m6 = periodFilter(performanceData[2])
            const y1 = periodFilter(performanceData[3])
            const y3 = periodFilter(performanceData[4])
            const si = periodFilter(performanceData[5])
            const asOfDate = fund.performance.asOfDate ? fund.performance.asOfDate.split('T')[0] : '-';

            return {
                name: fund.name,
                m1: m1,
                m3: m3,
                m6: m6,
                y1: y1,
                y3: y3,
                si: si,
                asOfDate: asOfDate
            }
        })

        overview.push({ fundName, fund })
        performance.push({ fundName, fund: data })
    })
    return { overview, performance };
};

export { getAllTypes, fundsFiltering, searchResult, fundsReducer }