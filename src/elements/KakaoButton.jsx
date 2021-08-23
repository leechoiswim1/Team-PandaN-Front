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
  margin-top: 2.75rem;
  width: 25rem;
  height: 3.75rem;
  padding: 0.25rem 1rem;
  font-weight: 700;
  font-size: 1.2rem;
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
    margin: 0 5rem;
  }

@media (max-width: 767px){
  width: 17.5rem;
  & span {
    margin: 0 1.25rem;
  }
}
`

export default KakaoButton;