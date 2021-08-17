import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* == Pages */
import { Login, LoginRedirect, Home, Bookmark, MyNote, Kanban, Detail, ProjectIssue, ProjectMyNote, NotFound } from "../pages";

// * == ( Router ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/user/kakao/callback" component={Auth(LoginRedirect, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
      <Route path="/projects" component={Auth(Home, false)} exact />
      <Route path="/bookmark" component={Auth(Bookmark, false)} exact />
      <Route path="/mynote" component={Auth(MyNote, false)} exact />
      <Route path="/projects/:projectId/kanban" component={Auth(Kanban, false)} exact />
      <Route path="/projects/:projectId/notes/:noteId" component={Auth(Detail, false)} exact />
      <Route path="/projects/:projectId/issue" component={Auth(ProjectIssue, false)} exact />
      <Route path="/projects/:projectId/mynote" component={Auth(ProjectMyNote, false)} exact />
      <Route path={"*"} component={NotFound} />
    </Switch>
  );
};

export default Router;
