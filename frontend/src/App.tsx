import React, {Suspense} from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import AppContextProvider from './context/AppContext'
import {fetchData} from './utils/FetchData'
import Header from './components/Header/Header'
import Disclaimer from './components/Disclaimer/Disclaimer'
import FundScreener from './FundScreener'
import Loader from './components/Loader/Loader'
import ErrorFallback from './ErrorFallback'

const App = () => (
    <>
        <Header />
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loader />}>
                <AppContextProvider resources={fetchData()}>
                    <FundScreener />
                </AppContextProvider>
            </Suspense>
        </ErrorBoundary>
        <Disclaimer />
    </>
)

export default App
