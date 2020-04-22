import React, { Component } from 'react';
import { setHeaderHeightSize } from 'utils/';

import HeaderBox from 'components/global/headerBox';
import Button from 'components/global/button';
import { Search } from 'components/icons/';
import Modal from 'components/modal';

import SearchPanel from 'containers/global/searchPanel/SearchPanel';

const HEADER_HEIGHT_CSS_CUSTOM_PROPS_NAME = '--header-height';

function IconSearch() {
  return <Search size={20} />;
}

class Header extends Component {
  state = {
    isSearchModalOpen: false,
  };

  headerRef = React.createRef(null);

  componentDidMount() {
    const headerBox = this.headerRef.current;

    setHeaderHeightSize(headerBox, HEADER_HEIGHT_CSS_CUSTOM_PROPS_NAME);
  }

  openSearchModal = () => {
    this.setState({ isSearchModalOpen: true });
  };

  closeSearchModal = () => {
    this.setState({ isSearchModalOpen: false });
  };

  render() {
    return (
      <div ref={this.headerRef}>
        <HeaderBox>
          <Button
            text="Найти фильм"
            iconComponent={IconSearch}
            iconRight={false}
            styleType="primary"
            handler={this.openSearchModal}
          />
          <Modal
            isOpen={this.state.isSearchModalOpen}
            onClose={this.closeSearchModal}
            position="top"
            shouldCloseOnOverlayClick={false}
            contentLabel="search-panel"
          >
            <SearchPanel closeModal={this.closeSearchModal} />
          </Modal>
        </HeaderBox>
      </div>
    );
  }
}

export default Header;
