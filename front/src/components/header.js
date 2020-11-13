import React from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <ul>
      <li>
        <Link to="/" className="active">
          Home
        </Link>
      </li>
      <li>
        <Link to="/mycontacts">My Contacts</Link>
      </li>
      <li>
        <Link to="/addcontact">Add Contact</Link>
      </li>
    </ul>
  );
};
export default Header;
