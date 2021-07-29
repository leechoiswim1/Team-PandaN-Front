import React from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components & elements */
import Header from "./Header";
import Sidebar from "./Sidebar";

// import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { Button, Accordion, Card } from "react-bootstrap";

const Template = ({ history }) => {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <StyledButton variant="primary">버튼</StyledButton>
      <Example>pixel to rem test</Example>
    </React.Fragment>
  );
};

// test case
const Example = styled.div(...t`
  width: 200px;
  height: 200px;
  color: red;
  background-color: blue;
`,);

const StyledButton = styled(Button)(...t`
  font-size: 60px;
  width: 200px;
  height: 200px;
`,)
;

export default Template;
