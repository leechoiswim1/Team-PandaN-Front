import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { PropagateLoader, ClipLoader } from "react-spinners";
import PandaImage from "../styles/images/Panda_Image.svg";
const Spinner = (props) => {
  if (!props.visible) {
    return <></>;
  }
  return (
    <React.Fragment>
      {props.Home === "Home" ? (
        <SpinnerBG>
          <SpinnerInner>
            <img src={PandaImage} alt="PandaSpinnerImage" style={{ marginBottom: "20px" }} />
            <PropagateLoader color="#E1EDE4" size="15" />
          </SpinnerInner>
        </SpinnerBG>
      ) : (
        <SpinnerInner>
          <ClipLoader color="#E1EDE4" size="40" />
        </SpinnerInner>
      )}
    </React.Fragment>
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
  display: flex;
  flex-direction: column;
  position: absolute;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
