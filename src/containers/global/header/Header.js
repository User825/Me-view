import React, { useState, useEffect, useRef } from 'react';
import { setElemHeightInCustomProps } from 'utils/';

import HeaderBox from 'components/global/headerBox';
import Button from 'components/global/button';
import { Row } from 'components/global/layout/';
import { Search, Dice } from 'components/icons/';
import Modal from 'components/modal';

import SearchPanel from 'containers/global/searchPanel/SearchPanel';
import ChoosePanel from 'containers/global/choosePanel/ChoosePanel';

const HEADER_HEIGHT_CSS_CUSTOM_PROPS_NAME = '--header-height';

const Header = () => {
  const [isSearchModalOpen, setSearchModalOpenState] = useState(false);
  const [isChooseModalOpen, setChooseModalOpenState] = useState(false);
  const header = useRef(null);

  useEffect(() => {
    setElemHeightInCustomProps(
      header.current,
      HEADER_HEIGHT_CSS_CUSTOM_PROPS_NAME
    );
  }, [header]);

  const openSearchModal = () => {
    setSearchModalOpenState(true);
  };

  const closeSearchModal = () => {
    setSearchModalOpenState(false);
  };

  const openChooseModal = () => {
    setChooseModalOpenState(true);
  };

  const closeChooseModal = () => {
    setChooseModalOpenState(false);
  };
  return (
    <HeaderBox ref={header}>
      <Row gap="lg">
        <Button
          iconComponent={() => <Dice size={25} />}
          iconRight={false}
          styleType="primary"
          handler={openChooseModal}
        />
      </Row>
      <Button
        iconComponent={() => <Search size={25} />}
        iconRight={false}
        styleType="primary"
        handler={openSearchModal}
      />
      <Modal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
        position="top"
        shouldCloseOnOverlayClick={false}
        contentLabel="search-panel"
      >
        <SearchPanel closeModal={closeSearchModal} />
      </Modal>
      <Modal
        isOpen={isChooseModalOpen}
        onClose={closeChooseModal}
        position="top"
        shouldCloseOnOverlayClick={false}
        contentLabel="choose-movie-panel"
        noScroll
      >
        <ChoosePanel closeModal={closeChooseModal} />
      </Modal>
    </HeaderBox>
  );
};

export default Header;
