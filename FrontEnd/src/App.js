import React, { Suspense, lazy } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, Route, Link, Switch } from "react-router-dom";

import { createBrowserHistory } from "history";
const RegistrationFormData = lazy(() => import("./Task/RegistrationFormData"));
const Login = lazy(() => import("./Task/Login"));

const Welcome = lazy(() => import("./Task/Welcome"));

const history = createBrowserHistory();

function App() {
  return (
    <>
      <div>
        <Router history={history}>
          <Suspense fallback={<p>Loading....</p>}>
            <Switch>
              <Route path="/" exact>
                <RegistrationFormData />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/welcome" exact>
                <Welcome />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </div>
    </>
  );
}

export default App;
