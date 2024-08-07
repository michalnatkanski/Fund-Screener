import styles from './Header.module.scss'

const Header = () => (
    <header className={styles.container}>
        <div className={styles.container__content}>
            <img src={'./logo.png'} alt='logo' />
            <h1 className={styles.container__content_title}>Our funds</h1>
            <p className={styles.container__content_description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec elementum ultricies nisi, fermentum
                bibendum lacus fermentum venenatis.
            </p>
        </div>
    </header>
)

export default Header
