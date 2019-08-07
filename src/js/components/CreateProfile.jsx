import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import AddUser from "./AddUser";

export default class CreateProfile extends React.Component {
  render() {
    return (
      <>
        <h1 className="main-title">grdian</h1>
        <AddUser />
      </>
    );
  }
}
