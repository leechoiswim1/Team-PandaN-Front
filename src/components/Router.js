import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* == Pages */
import { Login, Home, Bookmark, MyNote, Kanban, Detail, ProjectIssue, ProjectMyNote, NotFound } from "../pages";

// * == ( Router ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, true)} exact />
      <Route path="/projects" component={Auth(Home, true)} exact />
      <Route path="/bookmark" component={Auth(Bookmark, true)} exact />
      <Route path="/mynote" component={Auth(MyNote, true)} exact />
      <Route path="/projects/:projectId/kanban" component={Auth(Kanban, true)} exact />
      <Route path="/projects/:projectId/notes/:noteId" component={Auth(Detail, true)} exact />
      <Route path="/projects/:projectId/issue" component={Auth(ProjectIssue, true)} exact />
      <Route path="/projects/:projectId/mynote" component={Auth(ProjectMyNote, true)} exact />
      <Route path={"*"} component={NotFound} />
    </Switch>
  );
};

export default Router;
