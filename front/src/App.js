import logo from "./logo.svg";
import React from "react";
import { withRouter, Switch, Route } from "react-router-dom";

import Contact from "./components/contact";
import "./App.css";
import AddFormPage from "./pages/addFormPage";
import ContactListPage from "./pages/contactListPage";
import HomePage from "./pages/homePage";
import Header from "./components/header";

class App extends React.Component {
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
    const file = e.target.image.files[0];
    console.log(name, email, file);
    const body = new FormData();
    body.append("image", file);

    const url = `http://localhost:8000/addcontact?name=${name}&email=${email}`;
    console.log(url);
    try {
      const response = await fetch(url, { method: "POST", body });
      const result = await response.json();
      console.log(result);
      const contacts = [...this.state.contacts];
      contacts.push({ id: result.result, name, email, image: result.image });
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
        <>
          <Header />
          {
            <Switch>
              <Route
                path="/"
                exact
                render={(props) => <HomePage props={props} />}
              ></Route>
              <Route
                path="/addcontact"
                render={(props) => (
                  <AddFormPage
                    props={props}
                    createContact={this.createContact}
                  />
                )}
              ></Route>
              <Route
                path="/mycontacts"
                render={(props) => (
                  <ContactListPage
                    props={props}
                    contacts={this.state.contacts}
                    deleteContact={this.deleteContact}
                    updateContact={this.updateContact}
                  />
                )}
              ></Route>
            </Switch>
          }
        </>
      </div>
    );
  }
}
export default withRouter(App);
