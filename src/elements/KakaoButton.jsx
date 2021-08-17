import React                        from "react";
/* == Library - style */
import styled                       from "styled-components";
/* == Custom - Icon */
import { ReactComponent as Kakao }  from "../styles/images/ico-kakao-button.svg";

// * == ( Element > KakaoButton ) -------------------- * //
const KakaoButton = ({ type, onClick }) => {
  return (
    <Button type={type} onClick={onClick}>
      <Kakao />
      <span>카카오로 시작하기</span>
    </Button>
  );
}

const Button = styled.button`
  margin: 20px 0;
  max-width: 24rem;
  height: 3rem;
  padding: 0.25rem 1rem;
  font-weight: 500;
  font-size: 1.0rem;
  letter-spacing: -0.03rem;
  text-align: center;  
  display: block;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  color: #191919;
  background: #FFEB00;
  border-radius: 5px;
  & span {
    margin: 0 3.5rem;
  }

@media (max-width: 767px){
  & span {
    margin: 0 1rem;
  }
}
`

export default KakaoButton;