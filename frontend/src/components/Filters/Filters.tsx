import {useAppContext} from '../../context/AppContext'
import React from 'react'
import styles from './Filters.module.scss'

const Filters = () => {
    const {
        setAllTypes,
        setActiveOptions,
        setFilterDefault,
        filterOptions,
        clearFilterBtn,
        setFundsSearch,
        setSearchDefault,
        search,
    } = useAppContext()

    const {allCurrencies, allRegions, allTypes} = setAllTypes

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__flex}>
                    <input
                        type='search'
                        className={styles.wrapper__flex_filter}
                        value={search}
                        onChange={(e) => setFundsSearch(e)}
                        placeholder='Start typing to search...'
                    />
                    {search !== '' ? (
                        <button className={styles.wrapper__clearFilter_btn} onClick={setSearchDefault}>
                            clear search
                        </button>
                    ) : null}
                </div>

                <div className={styles.wrapper__flex}>
                    <label className={styles.wrapper__flex_label}>currency</label>
                    <div className={styles.select_wrapper}>
                        <select
                            className={styles.wrapper__flex_filter}
                            name='currency'
                            value={filterOptions.currency}
                            onChange={(e) => setActiveOptions(e)}
                        >
                            <option className={styles.option} value='All'>
                                All
                            </option>
                            {allCurrencies.map((option: string) => (
                                <option className={styles.option} key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.wrapper__flex}>
                    <label className={styles.wrapper__flex_label}>region</label>
                    <div className={styles.select_wrapper}>
                        <select
                            className={styles.wrapper__flex_filter}
                            name='region'
                            value={filterOptions.region}
                            onChange={(e) => setActiveOptions(e)}
                        >
                            <option className={styles.option} value='All'>
                                All
                            </option>
                            {allRegions.map((option: string) => (
                                <option className={styles.option} key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.wrapper__flex}>
                    <label className={styles.wrapper__flex_label}>type</label>
                    <div className={styles.select_wrapper}>
                        <select
                            className={styles.wrapper__flex_filter}
                            name='types'
                            value={filterOptions.type}
                            onChange={(e) => setActiveOptions(e)}
                        >
                            {allTypes.map((option: string) => (
                                <option className={styles.option} key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <div></div>
                    </div>

                    {clearFilterBtn ? (
                        <button className={styles.wrapper__clearFilter_btn} onClick={setFilterDefault}>
                            clear all filters
                        </button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Filters
