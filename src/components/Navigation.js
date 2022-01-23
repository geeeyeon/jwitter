import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">MyProfile</Link>
      </li>
    </ul>
  );
};
export default Navigation;
