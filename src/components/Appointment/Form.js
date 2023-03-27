import classNames from "classnames";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import React, { useState } from 'react';


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  //resets inputs for form values for student and interviewer
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };
  //clears the form values when user clicks cancel button
  const cancel = () => {
    reset();
    props.onCancel();
  };
  //saves form values when user clicks save button
  const save = () => {
    if (student && interviewer && props.onSave) {
      props.onSave(student, interviewer);
      reset();
    }
  };

//renders the form
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}