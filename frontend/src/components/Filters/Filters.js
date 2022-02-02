import { useAppContext } from "../../context/AppContext";
import React from "react";
import styles from '../../styles/Filters.module.scss';

const Filters = () => {

    const {
        setAllTypes,
        setActiveOptions,
        setFilterDefault,
        filterOptions,
        clearFilterBtn,
        setFundsSearch,
        setSearchDefault,
        search
    } = useAppContext();

    const {allCurrencies, allRegions, allTypes} = setAllTypes
    // console.log('FILTERS')
    return (  
            <div className={styles.wrapper}>
                <div className={styles.wrapper__flex}>
                <input type='search' className={styles.wrapper__flex_filter} value={search} onChange={(e) => setFundsSearch(e)} placeholder="Start typing to search..." />
                {search !== '' ? <button className={styles.wrapper__clearFilter_btn} onClick={setSearchDefault}>clear search</button> : null}
                </div>
                <div className={styles.wrapper__flex}>
                    <label className={styles.wrapper__flex_label}>currency</label>
                    <select className={styles.wrapper__flex_filter}
                        name="currency"
                        value={filterOptions.currency}
                        onChange={(e) => setActiveOptions(e)}
                    >
                        <option className={styles.option} value="All">All</option>
                        {allCurrencies.map(option => <option className={styles.option} key={option} value={option}>{option}</option>)}
                    </select>
                </div>
                <div className={styles.wrapper__flex}>
                <label className={styles.wrapper__flex_label}>region</label>
                    <select className={styles.wrapper__flex_filter}
                        name="region"
                        value={filterOptions.region}
                        onChange={(e) => setActiveOptions(e)}
                    >
                        <option className={styles.option} value="All">All</option>
                        {allRegions.map(option => <option className={styles.option} key={option} value={option}>{option}</option>)}
                    </select>
                </div>
                <div className={styles.wrapper__flex}>
                <label className={styles.wrapper__flex_label}>type</label>
                    <select className={styles.wrapper__flex_filter}
                        name="types"
                        value={filterOptions.type}
                        onChange={(e) => setActiveOptions(e)}
                    >
                        {allTypes.map(option => <option className={styles.option} key={option} value={option}>{option}</option>)}
                    </select>
                    <div>
                    {clearFilterBtn ? <button className={styles.wrapper__clearFilter_btn} onClick={setFilterDefault}>clear all filters</button> : null}
                </div>
                </div>
            </div>
    )
}

export default Filters;