import React from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";



export default function Appointment(props) {
  //define the different modes for the appointment component
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  //using the useVisualMode custom hook to manage the component state and transitions between different modes
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //this function saves interview data, updates mode state and transitions to SHOW or back to CREATE mode
  const save = (student, interviewer) => {
    props.onSave(student, interviewer);
    if (props.interview) {
    transition(SHOW);
  } else {
    back();
  }
}


  //render the entire appointment article element
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
    />
    )}
    {mode === CREATE && (
      <Form 
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave ={save}
      />
      )}
    </article>
  );
}





