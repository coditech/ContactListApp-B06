import React, { Component } from "react";
export default class Contact extends Component {
  state = {
    editView: false,
    name: this.props.contact.name,
    email: this.props.contact.email,
  };
  toggleView = () => {
    this.setState({ editView: !this.state.editView });
  };
  submitUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const id = this.props.contact.id;
    this.toggleView();
    console.log(name, email, id);
    this.props.updateContact(id, name, email);
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return this.state.editView ? (
      <form onSubmit={(e) => this.submitUpdate(e)}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input type="submit" value="UPDATE" />
      </form>
    ) : (
      <li>
        <img
          height="50px"
          src={`http://localhost:8000/images/${this.props.contact.image}`}
        />
        {this.props.contact.name} - {this.props.contact.email}
        <button
          onClick={() => {
            this.props.deleteContact(this.props.contact.id);
          }}
        >
          X
        </button>
        <button onClick={this.toggleView}>EDIT</button>
      </li>
    );
  }
}
