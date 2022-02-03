import {
    useState,
    createContext,
    useContext
} from "react";

import {
    getAllTypes,
    fundsFiltering,
    searchResult,
    fundsReducer
} from "../utils/Filtering";

import { useSearchDebounce } from "../utils/hooks";

const AppContext = createContext();

const AppContextProvider = ({ resources, children }) => {

    const data = resources.read();
    const [appState, setAppState] = useState(data);
    const [filterOptions, setFilterOptions] = useState({
        currency: 'All',
        region: 'All',
        type: getAllTypes(appState).allTypes[0],
    });

    const [clearFilterBtn, setClearFilterBtn] = useState(false)
    const [search, setSearch] = useState('')
    const debounceValue = useSearchDebounce(search, 250)
    const [activeTab, setActiveTab] = useState(true)

    const setActiveOptions = ({ target }) => {
        setFilterOptions({ ...filterOptions, [target.name]: target.value })
        setClearFilterBtn(true)
    }

    const setFundsSearch = ({ target }) => {
        setSearch(target.value)
    }

    const setFilterDefault = () => {
        setFilterOptions({ currency: 'All', region: 'All', type: getAllTypes(appState).allTypes[0], })
        setClearFilterBtn(false)
    }

    const setSearchDefault = () => {
        setSearch('')
    }

    const changeActiveTab = (tab) => setActiveTab(tab);

    const getFunds = fundsFiltering(appState, filterOptions);

    const getSearchResult = searchResult(getFunds, debounceValue)

    const setFunds = getSearchResult === null ? getFunds : getSearchResult;

    const funds = fundsReducer(setFunds)

    const setAllTypes =  getAllTypes(appState)

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
                    funds
                }}>
                {children}
            </AppContext.Provider>
        </>
    )
}

export default AppContextProvider;

export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('Context must be used within Provider');
    }
    return context;
}




