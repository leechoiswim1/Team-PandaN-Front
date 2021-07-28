import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

// import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import { Button, Accordion, Card } from "react-bootstrap";

const Template = ({ history }) => {
  return (
    <React.Fragment>
      <Header />
      <Sidebar />
      <Button variant="primary">버튼</Button>
    </React.Fragment>
  );
};

export default Template;
