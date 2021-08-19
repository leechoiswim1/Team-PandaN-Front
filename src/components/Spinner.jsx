import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FadeLoader } from "react-spinners";
const Spinner = (props) => {
  if (!props.visible) {
    return <></>;
  }
  return (
    <SpinnerBG>
      <SpinnerInner>
        <FadeLoader color="#387E4B" size="50" />
      </SpinnerInner>
    </SpinnerBG>
  );
};
Spinner.propTypes = {
  visible: PropTypes.bool,
};

const SpinnerBG = styled.div`
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 1000;
`;
const SpinnerInner = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
export default Spinner;
