import React, { useEffect } from "react";

/* == Library - style */
import styled, { css } from "styled-components";
import { t }  from "../util/remConverter";

/* == Custom - Icon */
import { ReactComponent as Add }      from "../styles/images/ico-project-add.svg";
import { ReactComponent as Close }    from "../styles/images/ico-close.svg";
/* == Custom - components */

/* == Redux - actions */
import { useSelector, useDispatch }   from 'react-redux';
import { noteActions }                from '../modules/note';

// * == ( ModalBox ) -------------------- * //
const ModalBox = ( props ) => {
  const { 
    className,
    onClose,
    maskClosable,
    visible,
    children,
    heading,
    btntext,
    btntext2,
    onSubmit,
    onDelete,
  } = props

  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  }

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  }

  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper 
        className={className} 
        tabIndex="-1" 
        visible={visible}
        onClick={maskClosable ? onMaskClick : null}
      >
        <div tabIndex="0" className="note-modal-container">
          <div className="note-modal-header">
            <div className="note-modal-title">
              <Add width="24" height="24" style={{marginRight: "8px"}}/>
              <h1>{heading}</h1>
            </div>
            <Close onClick={close} />
          </div>
          <div className="note-modal-content">
            {children}
          </div>
          <div className="note-modal-button">
            <h1 onClick={onSubmit}>{btntext}</h1>
            {btntext2 && <h1 onClick={onDelete}>{btntext2}</h1>}
          </div>
        </div>
      </ModalWrapper>
    </>
  )
}

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

export default ModalBox;