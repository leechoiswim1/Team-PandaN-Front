import React from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { AlignRight } from 'react-feather';
import { t } from "../util/remConverter";
import { Container, Button } from "react-bootstrap";
import Modals from "./Modals";

const Header = ({ history }) => {
  return (
    <header className="header" id="header">
      <Container fluid>
        <AlignRight />
        <Modals
          buttonTitle="멤버초대"
          Title="멤버초대"
          Content="코드받기로넣어줄코드~"
          Close="Close"
        />
      </Container>
    </header>
  );
};

export default Header;
