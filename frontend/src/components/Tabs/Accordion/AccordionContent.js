import styles from '../../../styles/Accordion.module.scss';

const AccordionContent = ({ funds }) => {
// console.log(funds.map(f => f.name))
  return (
<>
        {funds.map(fund => 
                  (fund.currency ? 
                    (
                        <div key={fund.name}>
                        <div className={styles.overview__tab_row}>
                          <div className={styles.overview__tab_column}>{fund.name}</div>
                          <div className={styles.overview__tab_column}>{fund.isin}</div>
                          <div className={styles.overview__tab_column}>{fund.region}</div>
                          <div className={styles.overview__tab_column}>{fund.type}</div>
                          <div className={styles.overview__tab_column}>{fund.launchDate ? fund.launchDate.split('T')[0] : '-'}</div>
                        </div>
                      </div>
                    ) : (
                        <div key={fund.name}>
                        <div className={styles.performance__tab_row}>
                          <div className={styles.performance__tab_column}>{fund.name}</div>
                          <div className={styles.performance__tab_column}>{fund.m1.value}</div>
                          <div className={styles.performance__tab_column}>{fund.m3.value}</div>
                          <div className={styles.performance__tab_column}>{fund.m6.value}</div>
                          <div className={styles.performance__tab_column}>{fund.y1.value}</div>
                          <div className={styles.performance__tab_column}>{fund.y3.value}</div>
                          <div className={styles.performance__tab_column}>{fund.si.value}</div>
                          <div className={styles.performance__tab_column}>{fund.asOfDate}</div>
                        </div>
                      </div>
                    ))
            )}  
           </>
  )
}
        

export default AccordionContent;