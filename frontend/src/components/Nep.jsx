import React, { Component, Fragment } from "react";
import Nepali from "nepalify-react";

const Nep = () => {
  return (
    <div>
      <Nepali funcname="preetify" />
      <Nepali funcname="unicodify" />
    </div>
  );
};

export default Nep;
