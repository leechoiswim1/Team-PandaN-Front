import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* == Pages */
import { Login, LoginRedirect, Home, Bookmark, MyNote, Kanban, Detail, ProjectIssue, ProjectMyNote, Search, NotFound } from "../pages";
// 배포 시 해당 라우트 삭제 예정 
import TestUser from "../pages/TestUser";

// * == ( Router ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/user/kakao/callback" component={Auth(LoginRedirect, false)} exact />
      <Route path="/" component={Auth(Home, true)} exact />
      <Route path="/projects" component={Auth(Home, true)} exact />
      <Route path="/bookmark" component={Auth(Bookmark, true)} exact />
      <Route path="/mynote" component={Auth(MyNote, true)} exact />
      <Route path="/search/:category/:q" component={Auth(Search, true)} exact />
      <Route path="/projects/:projectId/kanban" component={Auth(Kanban, true)} exact />
      <Route path="/projects/:projectId/notes/:noteId" component={Auth(Detail, true)} exact />
      <Route path="/projects/:projectId/issue" component={Auth(ProjectIssue, true)} exact />
      <Route path="/projects/:projectId/mynote" component={Auth(ProjectMyNote, true)} exact />
      <Route path="/pandantestuser" component={Auth(TestUser, true)} exact />
      <Route path={"*"} component={NotFound} />
    </Switch>
  );
};

export default Router;
