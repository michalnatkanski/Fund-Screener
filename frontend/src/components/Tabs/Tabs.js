import styles from './Tabs.module.scss';
import { useAppContext } from "../../context/AppContext";
import TabHeader from './TabHeader';

const Tabs = () => {

    const { activeTab, changeActiveTab } = useAppContext()

    return (
        <section className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.wrapper__tabs}>
                    <button
                        className={activeTab ?
                            styles.wrapper__tabs_btnActive :
                            styles.wrapper__tabs_btn}
                        onClick={() => changeActiveTab(true)}>
                        Overview
                    </button>
                    <button
                        className={activeTab ?
                            styles.wrapper__tabs_btn :
                            styles.wrapper__tabs_btnActive}
                        onClick={() => changeActiveTab(false)}>
                        Performance
                    </button>
                </div>
                <TabHeader />
            </div>
        </section>
    )
}

export default Tabs;