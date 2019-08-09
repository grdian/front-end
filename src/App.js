import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./js/components/LoginForm";
import CreateProfile from "./js/components/CreateProfile";
import MainView from "./js/components/MainView";
import SendAlert from "./js/components/SendAlert";
import GrdianView from "./js/components/GrdianView";
import Layout from "./js/components/Layout";

export default function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/create" component={CreateProfile} />
        <Route path="/main" component={MainView} />
        <Route path="/send" component={SendAlert} />
        <Route path="/grdian/:id" component={GrdianView} />
      </Switch>
    </Layout>
  );
}
