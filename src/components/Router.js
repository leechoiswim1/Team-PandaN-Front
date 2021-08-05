import React              from "react";
import { Switch, Route }  from "react-router-dom";
import Auth               from "../shared/auth";

/* == Pages */
import { Home, Login, Kanban, Detail, ProjectIssue } from "../pages";

// * == ( Ruter ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
      <Route path="/projects/:projectId" component={Auth(Kanban, false)} exact />
      <Route path="/projects/:projectId/notes/:noteId" component={Auth(Detail, false)} exact />
      <Route path="/projects/:projectId/issue" component={Auth(ProjectIssue, false)} exact />
    </Switch>
  );
};

export default Router;
