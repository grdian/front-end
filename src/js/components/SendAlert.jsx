import React from "react";

export default class SendAlert extends React.Component {
  render() {
    return (
      <>
        <section className="input-panel">
          <h3 className="field-label">Help Message:</h3>
          <input required value="I need help ASAP!" className="field-value" />
          <h3 className="field-label">Urgency Level:</h3>
          <select name="cars">
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
      </>
    );
  }
}
