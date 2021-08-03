import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

/* == Pages */
import { Home, Login, NoteKanban } from "../pages";

const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
      <Route path="/projects/:id" component={Auth(NoteKanban, false)} exact />
    </Switch>
  );
};

export default Router;
