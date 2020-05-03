import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { Down } from 'components/icons';
import {
  Accordion as ReactAccordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import styles from './accordion.module.css';

const classNamesModule = classNames.bind(styles);

const Accordion = ({ buttonText, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const accordionPanelStyles = classNamesModule({
    panelExpanded: isExpanded,
  });

  const accordionButtonStyles = classNamesModule({
    accordionButton: true,
    buttonExpanded: isExpanded,
  });

  const onChange = () => setIsExpanded(!isExpanded);

  return (
    <ReactAccordion
      className={styles.accordion}
      allowZeroExpanded
      onChange={onChange}
    >
      <AccordionItem>
        <AccordionItemHeading>
          <AccordionItemButton>
            <button type="button" className={accordionButtonStyles}>
              <span>{buttonText}</span>
              <Down />
            </button>
          </AccordionItemButton>
        </AccordionItemHeading>
        <AccordionItemPanel className={styles.panel}>
          <div className={accordionPanelStyles}>{children}</div>
        </AccordionItemPanel>
      </AccordionItem>
    </ReactAccordion>
  );
};

Accordion.propTypes = {
  buttonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Accordion;
