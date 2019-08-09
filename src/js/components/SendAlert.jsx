import React from "react";
import { Link } from "react-router-dom";

export default class SendAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: {
        senderId: 3,
        body: "I need help ASAP!",
        level: "high",
        location: { latitude: 0, longitude: 0 }
      }
    };
  }

  addNewMessageFetch = event => {
    const { alertMessage } = this.state;
    event.preventDefault();
    console.log("Message submitted!");

    fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(alertMessage)
    });
  };

  updateBody = event => {
    this.setState({
      alertMessage: {
        senderId: this.state.alertMessage.senderId,
        body: event.target.value,
        level: "high",
        location: { latitude: 0, longitude: 0 }
      }
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.addNewMessageFetch}>
          <button className="alert-button__send">
            <h1>send alert</h1>
            {/* <Link to="/main">
              <h1>send alert</h1>
            </Link> */}
          </button>
          <section className="input-panel">
            <h3 className="field-label">Help Message:</h3>
            <input
              type="text"
              required
              defaultValue="I need help ASAP!"
              contentEditable="true"
              className="field-value"
              onChange={this.updateBody}
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
