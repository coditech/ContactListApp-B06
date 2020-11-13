import React from "react";
import ContactList from "../components/contactList";

const ContactListPage = (props) => {
  return (
    <>
      <h2>Contacts: </h2>
      <ContactList props={props} />
    </>
  );
};
export default ContactListPage;
