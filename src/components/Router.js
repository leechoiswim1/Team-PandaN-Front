import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* pages */
import { Home, Login, NoteKanban, Projects } from "../pages";

const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
      <Route path="/note/kanban" component={Auth(NoteKanban, false)} exact />
      <Route
        path="/projects/:projectsId"
        component={Auth(Projects, false)}
        exact
      />
    </Switch>
  );
};

export default Router;
