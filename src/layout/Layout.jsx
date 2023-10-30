import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.component.jsx";

const MyComponent = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default MyComponent;
