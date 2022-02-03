import styles from './styles/Error.module.scss'

const ErrorFallback = ({ error }) =>
  <div className={styles.error} role="alert">
    Uups...There was an error:{' '}
    <pre style={{ whiteSpace: 'normal', color: 'red' }}>{error.message}</pre>
  </div>

export default ErrorFallback;