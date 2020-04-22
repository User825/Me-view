import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './modalTransition.css';
import styles from './modal.module.css';

import ReactModal from 'react-modal';

const classNamesModule = classNames.bind(styles);
ReactModal.setAppElement('#root');

function Modal({
  children,
  isOpen,
  onClose,
  contentLabel,
  shouldCloseOnOverlayClick = true,
  hasCloseButton = true,
  position = 'center',
}) {
  const modalClassName = classNamesModule({
    modalTop: position === 'top',
    modalCenter: position === 'center',
    modalBottom: position === 'bottom',
  });

  return (
    <ReactModal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      shouldCloseOnEsc={true}
      onRequestClose={onClose}
      className={modalClassName}
      bodyOpenClassName="modal-open"
      htmlOpenClassName="modal-open"
      overlayClassName={styles.overlay}
      contentLabel={contentLabel}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      closeTimeoutMS={300}
    >
      {hasCloseButton && (
        <button className={styles.closeBtn} onClick={onClose}>
          Close modal
        </button>
      )}
      <div className={styles.container}>{children}</div>
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
};

export default Modal;
