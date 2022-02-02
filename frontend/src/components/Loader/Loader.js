import styles from '../../styles/Loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <img className={styles.loader__spinner} src={'./spinner.svg'} alt='spinner'/>
        </div>
    )
}

export default Loader;