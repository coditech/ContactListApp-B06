// back/src/db.js
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import SQL from "sql-template-strings";
const initializeDatabase = async () => {
  // open the database
  const db = await open({
    filename: "./db.sqlite",
    driver: sqlite3.Database,
  });
  const getContactsList = async () => {
    const rows = await db.all(
      "SELECT contact_id AS id, name, email, image FROM contacts"
    );
    return rows;
  };
  const getContactByID = async (id) => {
    const rows = await db.all(
      `SELECT contact_id AS id, name, email, image FROM contacts where contact_id=${id}`
    );
    return rows;
  };
  const createContact = async (name, email, image) => {
    console.log(name, email);
    const query = `Insert into contacts (name, email, image) values ("${name}"," ${email}", "${image}")`;
    try {
      const result = await db.run(query);
      console.log(result);
      return result.lastID;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteContact = async (id) => {
    const result = await db.run(
      `DELETE FROM contacts WHERE contact_id = ${id}`
    );
    if (result.stmt.changes === 0) {
      return false;
    }
    return true;
  };
  const updateContact = async (id, props) => {
    let query = "";
    const { name, email } = props;
    if (!props || (!name && !email)) {
      return "error";
    }
    if (name && !email) {
      query = `UPDATE contacts SET  name="${props.name}" where contact_id = ${id}`;
    }

    if (email && !name) {
      query = `UPDATE contacts SET email="${props.email}" where contact_id = ${id}`;
    }
    if (name && email) {
      query = `UPDATE contacts SET email="${props.email}", name="${props.name}" where contact_id = ${id}`;
    }
    const result = await db.run(query);
    console.log(result);
    return true;
  };

  const controller = {
    getContactsList,
    getContactByID,
    createContact,
    deleteContact,
    updateContact,
  };

  return controller;
};
export default initializeDatabase;
