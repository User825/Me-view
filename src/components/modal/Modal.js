import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './modalTransition.css';
import styles from './modal.module.css';

import ReactModal from 'react-modal';

const classNamesModule = classNames.bind(styles);
ReactModal.setAppElement('#app');

function Modal({
  children,
  isOpen,
  onClose,
  afterOpen,
  contentLabel,
  shouldCloseOnOverlayClick = true,
  hasCloseButton = true,
  position = 'center',
  oneScreen = false,
  noScroll
}) {
  const modalClassName = classNamesModule({
    modalTop: position === 'top',
    modalCenter: position === 'center',
    modalBottom: position === 'bottom',
    noScroll: noScroll
  });

  const containerClassName = classNamesModule({
    container: true,
    oneScreen: oneScreen,
    oneScreenTop: position === 'top' && oneScreen,
  });

  const overlayClassName = classNamesModule({
    overlay: true,
    noScrollOverlay: noScroll
  })

  return (
    <ReactModal
      isOpen={isOpen}
      onAfterOpen={afterOpen}
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      className={modalClassName}
      bodyOpenClassName="modal-open"
      htmlOpenClassName="modal-open"
      overlayClassName={overlayClassName}
      contentLabel={contentLabel}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      closeTimeoutMS={300}
    >
      {hasCloseButton && (
        <button className={styles.closeBtn} onClick={onClose}>
          Close modal
        </button>
      )}
      <div className={containerClassName}>{children}</div>
    </ReactModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  contentLabel: PropTypes.string.isRequired,
  shouldCloseOnOverlayClick: PropTypes.bool,
  hasCloseButton: PropTypes.bool,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  oneScreen: PropTypes.bool,
  noScroll: PropTypes.bool
};

export default Modal;
