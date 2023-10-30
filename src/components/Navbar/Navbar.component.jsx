import React from "react";
import logo from "../../assets/white.svg";

const Navbar = () => {
  return (
    <>
      <nav className="navbar py-4">
        <div className="logo-container ms-3">
          <img src={logo} alt="Logo" />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
