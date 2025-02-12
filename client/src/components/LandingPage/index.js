import * as React from 'react';
import { NavLink } from "react-router-dom";
export default function LandingPage() {
  return(<div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">
    Navbar
  </a>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavDropdown"
    aria-controls="navbarNavDropdown"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/Invited">
          Invite 
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink className="nav-link" to="/Accepted">
          Accepted
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Rejected">
          Rejected
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/NoReply">
          No Response
        </NavLink>
      </li>

    </ul>
  </div>
</nav>


  </div>
  );
}