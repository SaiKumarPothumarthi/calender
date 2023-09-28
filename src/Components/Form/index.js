import React, { Component } from "react";
import "./index.css"
class Form extends Component {
  state = {
    date: "",
    title: "",
    time: "",
    color: "",
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { date, title, color,time } = this.state;
    this.props.addEvent({ date: parseInt(date), title, color, time });
    this.setState({ date: "", title: "", color: "", time:"" });
  };

  render() {
    const { date, title, color,time } = this.state;

    return (
      <div className="event-form">
        <h4>Add Event</h4>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div>
            <label className="label">Date</label>
            <input
              type="number"
              name="date"
              className="inputEl"
              value={date}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label className="label">Time</label>
            <input
              type="time"
              className="inputEl"
              name="time"
              value={time}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              className="inputEl"
              value={title}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label className="label">Color</label>
            <select
              name="color"
              className="inputEl"
              value={color}
              onChange={this.handleInputChange}
            >
              <option value="lightgreen">lightgreen</option>
              <option value="lightcoral">lightcoral</option>
              <option value="lightblue">lightblue</option>
              <option value="lightcyan">lightcyan</option>
              <option value="lightgrey">lightgrey</option>
            </select>
          </div>
          <div>
            <button className="buttonEl" type="submit">Add Event</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
