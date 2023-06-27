import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ImgModal } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ url, handleCloseModal }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [handleCloseModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      handleCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ImgModal>
        <img src={url} alt="" />
      </ImgModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
};
