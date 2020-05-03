import React from 'react';
import PropTypes from 'prop-types';

import {
  Tab as ReactTab,
  TabList as ReactTabList,
  Tabs as ReactTabs,
  TabPanel as ReactTabPanel,
} from 'react-tabs';

import styles from './tabs.module.css';

const Tabs = ({ selectedIndex = 0, onSelect, children, ...otherProps }) => {
  return (
    <ReactTabs
      className={styles.tabs}
      selectedIndex={selectedIndex}
      onSelect={onSelect}
      {...otherProps}
    >
      {children}
    </ReactTabs>
  );
};

Tabs.propTypes = {
  selectedIndex: PropTypes.number,
  onSelect: PropTypes.func,
  children: PropTypes.node.isRequired,
};

const TabList = ({ children, ...otherProps }) => {
  return (
    <ReactTabList className={styles.tabList} {...otherProps}>
      {children}
    </ReactTabList>
  );
};

ReactTabList.propTypes = {
  children: PropTypes.node.isRequired,
};
TabList.tabsRole = 'TabList';

const Tab = ({ children, ...otherProps }) => {
  return (
    <ReactTab
      className={styles.tab}
      selectedClassName={styles.selectedTab}
      {...otherProps}
    >
      <h3 className={styles.tabBox}>{children}</h3>
    </ReactTab>
  );
};

Tab.propTypes = {
  children: PropTypes.node.isRequired,
};
Tab.tabsRole = 'Tab';

const TabPanel = ({ children, ...otherProps }) => {
  return (
    <ReactTabPanel
      className={styles.tabPanel}
      selectedClassName={styles.selectedPanel}
      {...otherProps}
    >
      {children}
    </ReactTabPanel>
  );
};

TabPanel.tabsRole = 'TabPanel';

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Tabs, Tab, TabList, TabPanel };
