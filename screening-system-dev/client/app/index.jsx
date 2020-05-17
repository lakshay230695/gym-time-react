import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./components/App/App";
import NotFound from "./components/App/NotFound";
import "./styles/styles.scss";

import "bootstrap/dist/css/bootstrap.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./styles/scss/paper-dashboard.scss?v=1.1.0";
import "./styles/demo/demo.css";


import Register from "./components/Register/Register";
import Confirmation from "./components/Register/Confirmation";

render(
  <Router>
    <App>
      <Switch>
       
        <Route exact path="/" component={Register} />
        <Route path="/confirmation" component={Confirmation} />
       
        <Route path="/register" component={Register} />

        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById("app")
);
