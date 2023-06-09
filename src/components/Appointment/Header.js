import React from "react";
import classNames from "classnames";


//Update the <Header> component to display the time props we are passing to it. Answer below:
export default function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}