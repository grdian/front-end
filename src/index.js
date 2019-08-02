import React from "react";
import ReactDOM from "react-dom";
import LoginForm from "./js/components/LoginForm";

const greeting = "Login Page";

ReactDOM.render(
  <LoginForm greeting={greeting} />,
  document.getElementById("root")
);
