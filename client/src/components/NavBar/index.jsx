// Bringing in the required import from 'react-router-dom'
import { Link } from "react-router-dom";

function Nav() {
  // The Navbar UI component will render each of the Link elements in the links prop
  return (
    <Navbar
      links={[
        <Link key={1} className="nav-link text-light" to="/">
          Home
        </Link>,
        <Link key={3} className="nav-link text-light" to="/login">
          Login
        </Link>,
        <Link key={4} className="nav-link text-light" to="/signup">
          Signup
        </Link>,
        <Link key={4} className="nav-link text-light" to="/kanban">
          Kanban
        </Link>,
      ]}
    />
  );
}
function Navbar({ links }) {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {links.map((link) => link)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export { Navbar, Nav };
