import styles from './Accordion.module.scss'

type Props = {
    fundName: string
    isOpen: boolean
    setOpen: (isOpen: boolean) => void
}

const AccordionHeader = ({fundName, isOpen, setOpen}: Props) => (
    <div className={styles.accordion__header}>
        <button className={styles.accordion__header_btn} onClick={(e) => setOpen(!isOpen)}>
            {isOpen ? '+' : '-'}
        </button>
        <h2 className={styles.accordion__header_title}>{fundName}</h2>
    </div>
)

export default AccordionHeader
