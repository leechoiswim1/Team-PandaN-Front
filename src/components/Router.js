import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "../shared/auth";

// pages
import { Home, Login } from "../pages";

const Router = () => {
  return (
    <Switch>
      <Route path="/login" component={Auth(Login, false)} exact />
      <Route path="/" component={Auth(Home, false)} exact />
    </Switch>
  );
};

export default Router;
