import styles from '../../styles/Accordion.module.scss';
import { useAppContext } from "../../context/AppContext";
import Accordion from '../Tabs/Accordion/Accordion';


const TabHeader = () => {

    const { activeTab, funds } = useAppContext()

    return (
        <>
            {activeTab ? (
                <div className={styles.overview__tab}>
                    <div className={styles.overview__tab_row}>
                        <div className={styles.overview__tab_column}>Name</div>
                        <div className={styles.overview__tab_column}>ISIN</div>
                        <div className={styles.overview__tab_column}>Region</div>
                        <div className={styles.overview__tab_column}>Type</div>
                        <div className={styles.overview__tab_column}>Launch Date</div>
                    </div>
                    {funds.overview.length ?
                        <>
                            {funds.overview.map(funds =>
                                <Accordion
                                key={funds.fundName}
                                fundName={funds.fundName}
                                funds={funds.fund}
                                />
                            )}
                        </> : 
                        <div className={styles.overview__tab_notFound}>
                            funds not found
                        </div>}
                </div>
            ) : (
                <div className={styles.performance__tab}>
                    <div className={styles.performance__tab_row}>
                        <div className={styles.performance__tab_column}>Name</div>
                        <div className={styles.performance__tab_column}>1M</div>
                        <div className={styles.performance__tab_column}>3M</div>
                        <div className={styles.performance__tab_column}>6M</div>
                        <div className={styles.performance__tab_column}>1Y</div>
                        <div className={styles.performance__tab_column}>Y3</div>
                        <div className={styles.performance__tab_column}>SI</div>
                        <div className={styles.performance__tab_column}>As of Date</div>
                    </div>
                    {funds.overview.length ? 
                        <>
                            {funds.performance.map(funds =>
                                <Accordion
                                    key={funds.fundName}
                                    fundName={funds.fundName}
                                    funds={funds.fund}
                                />
                            )}
                        </> : 
                        <div className={styles.performance__tab_notFound}>
                            funds not found  
                        </div>
                    }
                </div>
            )
            }
        </>
    )
}

export default TabHeader;
