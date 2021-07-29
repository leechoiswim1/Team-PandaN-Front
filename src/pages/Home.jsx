import React from "react";
import Template from "../components/Template";

import { Container, Row, Col } from "react-bootstrap";

const Home = ({ history }) => {
  return (
    <Template>
      <main className="content" id="content">
        <Container fluid>
          <h1> Home 콘텐츠 작업공간</h1>
        </Container>
      </main>
    </Template>      
  );
};

export default Home;