import React from "react";
import logo from "../../assets/white.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar py-4">
        <div className="logo-container ms-3">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
