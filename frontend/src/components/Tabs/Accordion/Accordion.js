
import { useState } from 'react';
import AccordionHeader from '../Accordion/AccordionHeader';
import AccordionContent from '../Accordion/AccordionContent';
import PropTypes from 'prop-types';

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

Accordion.propTypes = {
    funds: PropTypes.array,
    fundName: PropTypes.string
}

Accordion.defaultProps = {
    fundName: 'fundName'
}