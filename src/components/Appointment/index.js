import React from "react";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";



export default function Appointment(props) {
  //define the different modes for the appointment component
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  //using the useVisualMode custom hook to manage the component state and transitions between different modes
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //this function saves interview data, updates mode state and transitions to SHOW or back to CREATE mode
 /* const save = (student, interviewer) => {
    props.onSave(student, interviewer);
    if (props.interview) {
    transition(SHOW);
  } else {
    back();
  }
} */
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
  //props.onSave(name, interviewer);
  transition(SAVING);

  //call the bookInterview function that saves the interview to the database and transition to SHOW mode once it's done
  props.bookInterview(props.id, interview).then(() => {
  transition(SHOW)});
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
      interview={props.interview}
    />
    )}
    {mode === CREATE && (
      <Form 
      interviewer={props.interviewer}
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave={save}
      bookInterview={props.bookInterview} 
      />
      )}
      {mode === SAVING && (
        <Status message="Saving" />
      )}
    </article>
  );
}





