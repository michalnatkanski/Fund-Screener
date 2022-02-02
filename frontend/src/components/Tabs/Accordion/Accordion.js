
import { useState } from 'react';
import AccordionHeader from '../Accordion/AccordionHeader';
import AccordionContent from '../Accordion/AccordionContent';
const Accordion = ({ funds, fundName}) => {

const [isOpen, setOpen] = useState(false);

    return (
        <>
            <AccordionHeader 
                isOpen={isOpen} 
                setOpen={setOpen} 
                fundName={fundName}
            />
            {
            !isOpen
                ?  <AccordionContent funds={funds}/>
                : null
            }           
        </>
    )
}

export default Accordion;