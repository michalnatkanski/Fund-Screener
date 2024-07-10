
export type Fund = {
    currency: string
    fundName: string
    name: string
    region: string
    isin: string
    type: string
    performance: {
        asOfDate: string
        data?: {
            period: string
            value: number
        }[] 
    }
    read: any
}

export type Funds = Fund[]

export type FilterOptions = {
    currency: string
    region: string
    type: string
}