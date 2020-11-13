import React from "react";
import Contact from "./contact";

const ContactList = (props) => {
  console.log(props.props);
  return (
    <ul>
      {props.props.contacts.map((contact) => (
        <Contact
          contact={contact}
          deleteContact={props.props.deleteContact}
          updateContact={props.props.updateContact}
        />
      ))}
    </ul>
  );
};
export default ContactList;
