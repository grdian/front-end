import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import CreateProfile from "./components/CreateProfile";
import MainView from "./components/MainView";
import SendAlert from "./components/SendAlert";
import GrdianView from "./components/GrdianView";
import Layout from "./components/Layout";
import AddUser from "./components/AddUser";

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
