import React from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components & elements */
import Header from "./Header";
import Sidebar from "./Sidebar";

// import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { Container, Row, Col, Button } from "react-bootstrap";

const Template = props => {
  return (
    <div className="col-wrap" id="wrap">
      {/* == left */}
      <div className="col-left">
        <Sidebar />
      </div>
      {/* == right */}
      <div className="col-right">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default Template;
