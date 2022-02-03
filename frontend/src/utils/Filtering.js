
//get fund types

const getAllTypes = (funds) => {
    const currencies = funds.map(fund => fund.currency);
    const regions = funds.map(fund => fund.region);
    const types = funds.map(fund => fund.type);
    const allCurrencies = currencies.filter((r, i) => currencies.indexOf(r) === i)
    const allRegions = regions.filter((r, i) => regions.indexOf(r) === i)
    const allTypes = types.filter((r, i) => types.indexOf(r) === i);
    return { allCurrencies, allRegions, allTypes }
}

//filtering uncompleted data

const fundsFitler = ((fund) =>
    fund &&
    fund.fundName &&
    fund.name && 
    fund.currency &&
    fund.region &&
    fund.isin &&
    fund.type &&
    fund.performance)

//funds filtering by choosen select options

const fundsFiltering = (data, filterOptions) => {
    const { currency, region, type } = filterOptions;

    const getFunds = (data, filter) => data.filter(app => filter(app))
    
    const funds = getFunds(data, fundsFitler)
    
    //alphabetical sort 
    const sortedFunds = funds.sort((a, b) => a.name.localeCompare(b.name))

    //funds fiilltering by selected option
    if (currency === 'All' && region !== 'All') {
        let filteredData = sortedFunds.filter(fund => {
            return (
                fund.region === region &&
                fund.type === type
            )
        })
        return filteredData;
    }
    else if (region === 'All' && currency !== 'All') {
        let filteredData = sortedFunds.filter(fund => {
            return (
                fund.currency === currency &&
                fund.type === type
            )
        })
        return filteredData;
    }
    else if (region === 'All' && currency === 'All') {
        let filteredData = sortedFunds.filter(fund => {
            return (
                fund.type === type
            )
        })
        return filteredData;
    }
    else {
        let filteredData = sortedFunds.filter(fund => {
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

const searchResult = (funds, searchValue) => {
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

const fundsReducer = (funds) => {

    const reducedFunds = funds.reduce((reducedFunds, fund) => {
        (reducedFunds[fund.fundName] = reducedFunds[fund.fundName] || []).push(fund)
        return reducedFunds;
    }, {});

    //grouping by fundname

    const overview = [];
    const performance = [];

    Object.keys(reducedFunds).map(fundName => {

        const fund = reducedFunds[fundName].map(fund => fund)

        const periodFilter = (periods) => periods === undefined ? { period: '-', value: '-' } : periods;

        const data = reducedFunds[fundName].map(fund => {

            const m1 = periodFilter(fund.performance.data[0])
            const m3 = periodFilter(fund.performance.data[1])
            const m6 = periodFilter(fund.performance.data[2])
            const y1 = periodFilter(fund.performance.data[3])
            const y3 = periodFilter(fund.performance.data[4])
            const si = periodFilter(fund.performance.data[5])
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