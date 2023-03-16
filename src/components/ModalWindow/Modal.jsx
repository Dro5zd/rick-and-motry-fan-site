import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as CloseSvg } from "../../assets/close.svg";
import s from './Modal.module.css'

const modalRoot = document.querySelector("#modal-root");
export const Modal = ({ onClose, children, type = "default" }) => {
  const body = document.querySelector("body");

  useEffect(() => {
    body.classList.add("no-scroll");

    return () => {
      body.classList.remove("no-scroll");
    };
  }, [body.classList]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        body.classList.remove("no-scroll");
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, body.classList]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      body.classList.remove("no-scroll");
      onClose();
    }
  };

  const renderContent = (children) => {
    return (
        <div className={s.content}>
          <button className={s.closeBtn}  type="button" onClick={onClose}>
            <CloseSvg />
          </button>
          {children}
        </div>
    );
  };

  return createPortal(
      <div className={s.backDrop} id="modal" onClick={handleBackdropClick}>
        {renderContent(children)}
      </div>,
      modalRoot
  );
};
