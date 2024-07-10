import {useState} from 'react'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import {Funds} from '../../../../types'

type Props = {
    funds: Funds
    fundName: string
}

const Accordion = ({funds, fundName}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <>
            <AccordionHeader isOpen={isOpen} setOpen={setOpen} fundName={fundName} />
            {!isOpen ? <AccordionContent funds={funds} /> : null}
        </>
    )
}

export default Accordion
