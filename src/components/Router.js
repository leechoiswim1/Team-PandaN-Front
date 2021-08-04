import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* pages */
import { Home, Login, Kanban, Projects, Detail } from "../pages";

// * == ( Ruter ) -------------------- * //
const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
      <Route
        path="/projects/:projectId"
        component={Auth(Projects, false)}
        exact
      />
      <Route
        path="/projects/:projectId/notes/:noteId"
        component={Auth(Detail, false)}
        exact
      />
      <Route
        path="/projects/:projectId/kanban"
        component={Auth(Kanban, false)}
        exact
      />
    </Switch>
  );
};

export default Router;
