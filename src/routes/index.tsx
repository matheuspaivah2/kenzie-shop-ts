import React from "react";
import { Switch } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Route from "./route";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} isPrivate={false} />
      <Route path="/cart" exact={false} component={Cart} isPrivate={false} />
      <Route path="/login" exact={false} component={Login} isPrivate={false} />
      <Route path="/dashboard" exact={false} component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
