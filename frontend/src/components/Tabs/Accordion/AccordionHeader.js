import styles from '../../../styles/Accordion.module.scss';

const AccordionHeader =
    ({
        fundName,
        isOpen,
        setOpen
    }) =>

       
        <div className={styles.accordion__header}>
            <button
                className={styles.accordion__header_btn}
                onClick={(e) => setOpen(!isOpen)}>
                {isOpen ? '+' : '-'}
            </button>
            <h2
                className={styles.accordion__header_title}>
                {fundName}
            </h2>
        </div>

export default AccordionHeader;