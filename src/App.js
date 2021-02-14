import logo from "./logo.svg";
import "./App.css";
import { Route, Link, BrowserRouter, Switch } from "react-router-dom";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import PublicRoute from "./pages/PublicRoute";
import PrivateRoute from "./pages/PrivateRoute";
import React, { useState, useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={LoginForm} path="/" exact />
        <PublicRoute
          restricted={false}
          component={SignUpForm}
          path="/signup"
          exact
        />
        <PrivateRoute
          restricted={true}
          component={UserList}
          path="/dashboard"
          exact
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
