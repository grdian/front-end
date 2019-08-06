import React from "react";
import "../../css/common.css";
import "../../css/specific/login.css";
import "../../css/responsive.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../images/grdian_logo.png";

export default class SendAlert extends React.Component {
  render() {
    const greeting = this.props.greeting;
    return (
      <>
        <section class="input-panel">
          <h3 class="field-label">Help Message:</h3>
          <input required value="I need help ASAP!" class="field-value" />
          <h3 class="field-label">Urgency Level:</h3>
          <select name="cars">
            <option class="emergency" value="emergency">
              EMERGENCY
            </option>
            <option class="high" value="high">
              HIGH
            </option>
            <option class="moderate" value="moderate">
              Moderate
            </option>
            <option class="minor" value="minor">
              Minor
            </option>
          </select>
          <h3 class="field-label">Location:</h3>
          <input
            required
            placeholder="(40.545542, -83.453453)"
            class="field-value"
          />
        </section>
      </>
    );
  }
}
