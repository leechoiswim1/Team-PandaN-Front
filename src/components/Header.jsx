import React from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { AlignRight } from "react-feather";
import { t } from "../util/remConverter";
import { Container, Button } from "react-bootstrap";
import { Modals, EditorModal } from "./";

const Header = ({ history }) => {
  return (
    <header className="header" id="header">
      <Container fluid>
        <div>
          <h3>ProjectTitle</h3>
          <h6>여기에 프로젝트 설명을씁니다 하하하하</h6>
        </div>
        <div>
          <input placeholder="검색" />
          <EditorModal />
          <Button>프로필</Button>
          <Button>문서작성</Button>
          <Modals
            buttonTitle="멤버초대"
            Title="멤버초대"
            Content="코드받기로넣어줄코드~"
            Close="Close"
          />
          <AlignRight />
        </div>
      </Container>
    </header>
  );
};

export default Header;
