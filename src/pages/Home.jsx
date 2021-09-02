import React, { useEffect } from "react";

/* components & elements */
import { Template, ProjectCardList, EmptyProject, Spinner } from "../components";

/* == Redux - actions */
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";

const Home = ({ history, match }) => {
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
      <Template match={match}>
        <main className="content" id="content">
          {project_list.length > 0 ? <ProjectCardList /> : <EmptyProject />}
        </main>
      </Template>
    </>
  );
};

export default Home;
