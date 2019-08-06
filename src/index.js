import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./js/components/LoginForm";
import App from "./js/app";
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
const greeting = "Login Page";


// ReactDOM.render(
//   <LoginForm greeting={greeting} />,
//   document.getElementById("root")
// );

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)