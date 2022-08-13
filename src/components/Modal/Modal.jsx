import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from "./Modal.module.css"
import PropTypes from "prop-types"

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImg, onClose }) => {
  const clickEscapeHandler = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const clickBackdropHandler = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', clickEscapeHandler)
    return () => { window.removeEventListener('keydown', clickEscapeHandler) };
    // eslint-disable-next-line
  }, [])
  return createPortal(
    <div className={css.Overlay} onClick={clickBackdropHandler}>
      <div className={css.Modal}>
        <img src={largeImg} alt={largeImg} />
      </div>
    </div>,
    modalRoot
  );
}
Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
}
