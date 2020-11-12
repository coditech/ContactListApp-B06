import logo from "./logo.svg";
import React from "react";
import Contact from "./contact";
import "./App.css";

export default class App extends React.Component {
  state = {
    contacts: [],
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:8000/contacts");
    const result = await response.json();
    console.log(result);
    this.setState({ contacts: result.contacts });
  }
  createContact = async (e) => {
    console.log(e);
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    console.log(name, email);
    const url = `http://localhost:8000/addcontact?name=${name}&email=${email}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const contacts = [...this.state.contacts];
      contacts.push({ id: result.result, name, email });
      this.setState({ contacts });
    } catch (e) {
      console.log(e);
    }
  };
  deleteContact = async (id) => {
    const url = `http://localhost:8000/deletecontact/${id}`;
    console.log(url);
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result);
      const contacts = this.state.contacts.filter(
        (contact) => contact.id !== id
      );
      this.setState({ contacts });
    } catch (e) {
      console.log(e);
    }
  };
  updateContact = async (id, name, email) => {
    let url = "http://localhost:8000/updatecontact/";
    if (!name && !email) {
      return;
    }
    if (name && !email) {
      url += `${id}?name=${name}`;
    }
    if (!name && email) {
      url += `${id}?email=${email}`;
    }
    if (name && email) {
      url += `${id}?name=${name}&email=${email}`;
    }
    console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const contacts = this.state.contacts.map((contact) => {
      if (contact.id === id) {
        const new_contact = {
          id: contact.id,
          name: name || contact.name,
          email: email || contact.email,
        };
        return new_contact;
      }
      // otherwise, don't change the contact at all
      else {
        return contact;
      }
    });
    this.setState({ contacts });
  };

  render() {
    return (
      <div className="App">
        <ul>
          {this.state.contacts.map((contact) => (
            <Contact
              contact={contact}
              deleteContact={this.deleteContact}
              updateContact={this.updateContact}
            />
          ))}
        </ul>
        <form onSubmit={this.createContact}>
          <input type="text" name="name" placeholder="insert name" />
          <input type="email" name="email" placeholder="insert email" />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
