import React, { Component, Fragment } from "react";
import Nepali from "nepalify-react";

export class Test extends Component {
  render() {
    return (
      <Fragment>
        <Nepali funcname="preetify" />
        <Nepali funcname="unicodify" />
      </Fragment>
    );
  }
}
