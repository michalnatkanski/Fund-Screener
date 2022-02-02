import styles from '../../styles/Tabs.module.scss';
import { useAppContext } from "../../context/AppContext";
import TabHeader from './TabHeader';
const Tabs = () => {
// console.log('rerender TABS ')
    const { activeTab, changeActiveTab } = useAppContext()

    return (
        <section className={styles.container}>
            <div className={styles.container__tabs}>
                <button
                    className={activeTab ?
                        styles.container__tabs_btnActive :
                        styles.container__tabs_btn}
                    onClick={() => changeActiveTab(true)}>
                    Overview
                </button>
                <button
                    className={activeTab ?
                        styles.container__tabs_btn :
                        styles.container__tabs_btnActive}
                    onClick={() => changeActiveTab(false)}>
                    Performance
                </button>
            </div>
            <TabHeader/>
        </section>
    )
}

export default Tabs;
