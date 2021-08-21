import React, { useEffect } from "react";
/* styled-components 및 rem 변환 모듈 */
import styled, { css } from "styled-components";
import { t } from "../util/remConverter";
/* components & elements */
import { Template, ProjectCardList, EmptyProject } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";
import { Spinner } from "../components";

// import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

const Home = ({ history }) => {
  const is_loading = useSelector((state) => state.project.is_loading);
  const project_list = useSelector((state) => state.project.list);
  const project_list_length = project_list.length;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(projectActions.__setProject());
  }, [dispatch, project_list_length]);

  return (
    <>
      <Spinner visible={is_loading} Home={"Home"} />
      <Template>
        <main className="content" id="content">
          {project_list.length > 0 ? <ProjectCardList /> : <EmptyProject />}
        </main>
      </Template>
    </>
  );
};

export default Home;
