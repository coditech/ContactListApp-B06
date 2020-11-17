import React, { Component } from "react";

const AddForm = (props) => {
  return (
    <form onSubmit={props.createContact}>
      <input type="text" name="name" placeholder="insert name" />
      <input type="email" name="email" placeholder="insert email" />
      <input type="file" name="image" />
      <input type="submit" value="Submit" />
    </form>
  );
};
export default AddForm;
