import React from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components & elements */
import { Template, ProjectCardList, EmptyProject } from "../components";
import { useSelector } from "react-redux";

// import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

const Home = ({ history }) => {
  const project_list = useSelector(state => state.project.list);

  return (
    <Template>
      <main className="content" id="content">
        {project_list.length > 0 ? <ProjectCardList /> : <EmptyProject />}
      </main>
    </Template>
  );
};

export default Home;
