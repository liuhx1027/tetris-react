import * as React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import App from "./App";
// import Home from "./components/home";
// import Contract from "./components/contract";
// import Profile from "./components/profile";

export const AppRouter: React.FC<{}> = () => {
  return (
    <HashRouter>
      <div className="container-fluid">
        <Route component={App} />
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/contract" component={Contract} />
          <Route path="/profile" component={Profile} /> */}
        </Switch>
      </div>
    </HashRouter>
  );
};
