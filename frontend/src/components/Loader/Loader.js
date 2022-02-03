import styles from './Loader.module.scss';

const Loader = () => 

        <div className={styles.loader}>
            <img 
                className={styles.loader__spinner} 
                src={'./spinner.svg'} 
                alt='spinner'
            />
        </div>

export default Loader;