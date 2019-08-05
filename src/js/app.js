import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import CreateProfile from './components/CreateProfile'
import MainView from './components/MainView'

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={LoginForm} />
      <Route path="/create" component={CreateProfile} />
      <Route path="/main" component={MainView} />
    </Switch>
  )
}