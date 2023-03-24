import React from "react";
import "components/Appointment/styles.scss";
import classNames from "classnames";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";

/* export default function Appointment(props) {
  return (
    <article className="appointment"></article>
  );
} */

export default function Appointment(props) {
  //render the entire appointment article element
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/*using a ternary operator to conditionally render a Show or Empty component based on the truthiness of props.interview */}
      {props.interview ? (
        //if props.interview is truthy, render the Show component with the appropriate props
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        //if props.interview is falsy, render the Empty component with the onAdd prop
        <Empty onAdd={props.onAdd} />
      )}
    </article>
  );
}





