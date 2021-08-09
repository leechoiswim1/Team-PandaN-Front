import React, { useEffect } from "react";

/* components & elements */
import { Header, Sidebar, ProjectHeader, Contents } from "../components";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as projectActions } from "../modules/project";

const Projects = props => {
  const dispatch = useDispatch();
  console.log(props);
  const projectId = props.match.params.projectsId;
  useEffect(() => {
    dispatch(projectActions.__setOneProject(projectId));
  }, []);

  return (
    <React.Fragment>
      <div className="col-wrap" id="wrap">
        {/* == left */}
        <div className="col-left">
          <Sidebar />
        </div>
        {/* == right */}
        <div className="col-right">
          <Header />
          <ProjectHeader project={projectId} />
          <Contents />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Projects;
