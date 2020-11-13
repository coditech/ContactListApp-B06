import React, { Component } from "react";
import AddForm from "../components/addForm";

const AddFormPage = (props) => {
  console.log(props.props);
  return (
    <>
      <h2>Create a new contact:</h2>
      <AddForm props={props} createContact={props.createContact} />
    </>
  );
};
export default AddFormPage;
