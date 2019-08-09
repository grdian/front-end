import React from "react";
import { Link } from "react-router-dom";

export default class SendAlert extends React.Component {
  render() {
    return (
      <>
        <form>
          <button className="alert-button__send">
            <Link to="/main">
              <h1>send alert</h1>
            </Link>
          </button>
          <section className="input-panel">
            <h3 className="field-label">Help Message:</h3>
            <input
              type="text"
              required
              defaultValue="I need help ASAP!"
              contentEditable="true"
              className="field-value"
            />
            <h3 className="field-label">Urgency Level:</h3>
            <select name="urgency">
              <option className="emergency" value="emergency">
                EMERGENCY
              </option>
              <option className="high" value="high">
                HIGH
              </option>
              <option className="moderate" value="moderate">
                Moderate
              </option>
              <option className="minor" value="minor">
                Minor
              </option>
            </select>
            <h3 className="field-label">Location:</h3>
            <input
              required
              placeholder="(40.545542, -83.453453)"
              className="field-value"
            />
          </section>
        </form>
      </>
    );
  }
}
