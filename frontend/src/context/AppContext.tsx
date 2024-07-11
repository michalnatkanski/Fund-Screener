import {useState, createContext, useContext, ReactNode} from 'react'

import {getAllTypes, fundsFiltering, searchResult, fundsReducer} from '../utils/Filtering'

import {useSearchDebounce} from '../utils/hooks'
import {Funds, ReducedFunds} from '../../types'

interface AppContextType {
    setAllTypes: any
    setActiveOptions: ({target}: {target: {name: string; value: string}}) => void
    filterOptions: {currency: string; region: string; type: string}
    setFilterDefault: () => void
    clearFilterBtn: boolean
    setFundsSearch: ({target}: Target) => void
    setSearchDefault: () => void
    search: string
    changeActiveTab: (tab: boolean) => void
    activeTab: boolean
    funds: ReducedFunds
}

const AppContext = createContext<AppContextType>({} as AppContextType)

type Target = {
    target: {
        name: string
        value: string
    }
}

interface Resources {
    resources: {read: () => Funds}
    children: ReactNode
}

const AppContextProvider = ({resources, children}: Resources) => {
    const appState: Funds = resources.read()

    const [filterOptions, setFilterOptions] = useState({
        currency: 'All',
        region: 'All',
        type: getAllTypes(appState)!.allTypes[0],
    })

    const [clearFilterBtn, setClearFilterBtn] = useState(false)
    const [search, setSearch] = useState('')
    const debounceValue = useSearchDebounce(search, 250)
    const [activeTab, setActiveTab] = useState(true)

    const setActiveOptions = ({target}: Target) => {
        setFilterOptions({...filterOptions, [target.name]: target.value})
        setClearFilterBtn(true)
    }

    const setFundsSearch = ({target}: Target) => {
        setSearch(target.value)
    }

    const setFilterDefault = () => {
        setFilterOptions({currency: 'All', region: 'All', type: getAllTypes(appState)!.allTypes[0]})
        setClearFilterBtn(false)
    }

    const setSearchDefault = () => {
        setSearch('')
    }

    const changeActiveTab = (tab: boolean) => setActiveTab(tab)

    const getFunds = fundsFiltering(appState, filterOptions)

    const getSearchResult = searchResult(getFunds, debounceValue)

    const setFunds = getSearchResult === null ? getFunds : getSearchResult

    const funds = fundsReducer(setFunds)

    const setAllTypes = getAllTypes(appState)

    if (!funds) return

    return (
        <>
            <AppContext.Provider
                value={{
                    setAllTypes,
                    setActiveOptions,
                    filterOptions,
                    setFilterDefault,
                    clearFilterBtn,
                    setFundsSearch,
                    setSearchDefault,
                    search,
                    changeActiveTab,
                    activeTab,
                    funds,
                }}
            >
                {children}
            </AppContext.Provider>
        </>
    )
}

export default AppContextProvider

export function useAppContext() {
    const context = useContext(AppContext)
    if (context === undefined) {
        throw new Error('Context must be used within Provider')
    }
    return context
}
