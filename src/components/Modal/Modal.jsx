import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, url, text }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        <img src={url} alt={text} />
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
}
Modal.propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
};
