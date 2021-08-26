import React, { useEffect } from "react";
/* == Library - style */
import styled, { keyframes } from "styled-components";
/* == Redux - actions */
import { useDispatch }   from 'react-redux';

// * == ( Note - common function/ state for modals) -------------------- * //
const ModalWrapper = ( { visible, maskClosable, onClose, children, ...rest } ) => {
  // hook
  const dispatch = useDispatch();

  // 모달 열렸을 때 뒤쪽 스크롤 고정
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = `position: ""; top: "";`;
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, []);

  // functions 
  // 클릭 시 모달창 닫힘; 모달창 바깥 영역
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  }


  return (
    <>
      <Overlay visible={visible} />       
      <Wrapper 
        tabIndex="-1" 
        visible={visible}
        onClick={maskClosable ? onMaskClick : null}>
        {/* <Window> */}
          {children}
        {/* </Window> */}
      </Wrapper>
    </>
  )
}

const Overlay = styled.div`
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
const Wrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.1);
`
const fadeIn = keyframes`
  from { opacity:0; }
  to{ opaciry:1; }
`;

const Window = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 430px;
  background: #ffffff;
  border-radius: 20px;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

`;

export default ModalWrapper;